const express = require('express');
const router = express.Router();
const supabase = require('../supabaseClient');

router.get('/', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('venue')
      .select('id, name, image_url, unlock_price_gold, unlock_price_real, unlock_with_ads')
      .eq('isActive', true)
      .order('order', { ascending: true });

    if (error) {
      console.error('Supabase error:', error);
      return res.status(500).json({ message: 'Venue fetch error', error });
    }

    res.json(data);
  } catch (err) {
    console.error('Server error:', err);
    res.status(500).json({ message: 'Venue fetch error' });
  }
});

module.exports = router;
