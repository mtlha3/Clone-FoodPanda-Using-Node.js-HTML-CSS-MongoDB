const express = require('express');
const router = express.Router();
const allFoods = require('../models/addFoodsmodel');
const { url } = require('inspector');

router.post('/addfood', async (req, res) => {
  try {
    const {
      foodid: foodid,
      foodname: foodname,
      foodprice: foodprice,
      url: url,
    } = req.body;

    const newFoods = new allFoods({
      foodid,
      foodname,
      foodprice,
      url,
    });
    await newFoods.save();
    res.status(201).json({ message: 'Food item added successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/', async (req, res) => {
  try {
    const foods = await allFoods.find({});
    res.json(foods);
  } catch (error) {
    console.error('Error fetching foods:', error);
    res.status(500).json({ error: 'Server Error' });
  }
});

router.put('/:foodId', async (req, res) => {
  const foodId = req.params.foodId;
  const updatedFood = req.body;

  try {
    const response = await allFoods.findOneAndUpdate(
      { foodid: foodId },
      updatedFood,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!response) {
      return res.status(404).json({ error: 'Food item not found' });
    }

    res.status(200).json(response);
  } catch (error) {
    console.error('Error updating food item:', error);
    res.status(500).json({ error: 'Server Error' });
  }
});

router.delete('/:foodId', async (req, res) => {
  const foodId = req.params.foodId;

  try {
    const deletedFood = await allFoods.findOneAndDelete({ foodid: foodId });

    if (!deletedFood) {
      return res.status(404).json({ error: 'Food item not found' });
    }

    res.status(200).json({ message: 'Food item deleted successfully' });
  } catch (error) {
    console.error('Error deleting food item:', error);
    res.status(500).json({ error: 'Server Error' });
  }
});

module.exports = router;
