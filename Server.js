const express = require('express');
const app = express();
const port = 1000;

const bodyparser = require('body-parser');
const cors = require('cors');
// app.use(bodyparser.json({ limit: '10mb' }));
// app.use(bodyparser.urlencoded({ limit: '10mb', extended: true }));
app.use(bodyparser.json());
app.use(cors());

//port no 1000
app.listen(port,(req,res)=>{
    console.log("tge port is listening");
});

const {connectDb} = require('./connection');
connectDb();

const Food = require('./Schema');
//schema load ^

app.post('/foods', async (req, res) => {
  try {
    const { name, rating } = req.body;

    // Find the food by name
    const food = await Food.findOne({ name });

    // Handle case where food is not found
    if (!food) {
      return res.status(404).json({ error: 'Food not found' });
    }

    // Calculate new total stars and feedback count
    const newTotalStars = Number(food.totalStars) + Number(rating);
    const newFeedbackCount = food.numFeedback + 1;

    // Update the food with new rating
    await Food.findOneAndUpdate({ name }, {
      totalStars: newTotalStars,
      numFeedback: newFeedbackCount,
    });

    res.status(200).json({ message: 'Food rating updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


app.post('/typer', async (req, res) => {
  try {
    const { type } = req.body;
    console.log(type)
    const foods = await Food.find({ type });
    res.json(foods);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/typer2', async (req, res) => {
  try {
    const { name } = req.body;
    console.log(name)
    const foods = await Food.find({ name });
    res.json(foods);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
