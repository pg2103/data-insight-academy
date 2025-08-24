import { Router } from 'express';
import { authenticateToken, AuthenticatedRequest } from '../middleware/auth';
import { validateProfileUpdate } from '../middleware/validation';
import { strictLimiter } from '../middleware/rateLimiting';
import { db } from '../config/database';
import { supabase } from '../config/supabase';

const router = Router();

// Get current user profile
router.get('/profile', authenticateToken, async (req: AuthenticatedRequest, res) => {
  try {
    const userId = req.user!.id;
    const profile = await db.getProfile(userId);
    
    res.json({
      success: true,
      data: profile
    });
  } catch (error) {
    console.error('Profile fetch error:', error);
    res.status(500).json({
      error: 'Failed to fetch profile',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// Update user profile
router.put('/profile', authenticateToken, validateProfileUpdate, async (req: AuthenticatedRequest, res) => {
  try {
    const userId = req.user!.id;
    const updates = req.body;
    
    const updatedProfile = await db.updateProfile(userId, updates);
    
    res.json({
      success: true,
      data: updatedProfile,
      message: 'Profile updated successfully'
    });
  } catch (error) {
    console.error('Profile update error:', error);
    res.status(500).json({
      error: 'Failed to update profile',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// Delete user account
router.delete('/account', authenticateToken, strictLimiter, async (req: AuthenticatedRequest, res) => {
  try {
    const userId = req.user!.id;
    
    // Delete user from Supabase Auth (this will cascade to profile via trigger)
    const { error } = await supabase.auth.admin.deleteUser(userId);
    
    if (error) {
      throw new Error(`Failed to delete user: ${error.message}`);
    }
    
    res.json({
      success: true,
      message: 'Account deleted successfully'
    });
  } catch (error) {
    console.error('Account deletion error:', error);
    res.status(500).json({
      error: 'Failed to delete account',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// Get user statistics
router.get('/stats', authenticateToken, async (req: AuthenticatedRequest, res) => {
  try {
    const userId = req.user!.id;
    const profile = await db.getProfile(userId);
    
    // Calculate user statistics
    const stats = {
      accountAge: Math.floor((Date.now() - new Date(profile.created_at).getTime()) / (1000 * 60 * 60 * 24)),
      lastLogin: new Date().toISOString(),
      profileCompleteness: calculateProfileCompleteness(profile),
      role: profile.role || 'user'
    };
    
    res.json({
      success: true,
      data: stats
    });
  } catch (error) {
    console.error('Stats fetch error:', error);
    res.status(500).json({
      error: 'Failed to fetch user statistics',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// Verify user session
router.get('/verify', authenticateToken, (req: AuthenticatedRequest, res) => {
  res.json({
    success: true,
    data: {
      user: req.user,
      authenticated: true
    }
  });
});

// Change user role (admin only)
router.patch('/role/:userId', authenticateToken, strictLimiter, async (req: AuthenticatedRequest, res) => {
  try {
    const currentUser = req.user!;
    const { userId } = req.params;
    const { role } = req.body;
    
    // Check if current user is admin
    if (currentUser.role !== 'admin') {
      return res.status(403).json({
        error: 'Insufficient permissions',
        message: 'Admin role required'
      });
    }
    
    if (!['user', 'admin', 'moderator'].includes(role)) {
      return res.status(400).json({
        error: 'Invalid role',
        message: 'Role must be user, admin, or moderator'
      });
    }
    
    const updatedProfile = await db.updateProfile(userId, { role });
    
    res.json({
      success: true,
      data: updatedProfile,
      message: 'User role updated successfully'
    });
  } catch (error) {
    console.error('Role update error:', error);
    res.status(500).json({
      error: 'Failed to update user role',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

function calculateProfileCompleteness(profile: any): number {
  const fields = ['full_name', 'email', 'avatar_url'];
  const filledFields = fields.filter(field => profile[field] && profile[field].trim() !== '');
  return Math.round((filledFields.length / fields.length) * 100);
}

export default router;