const express = require('express');
const router = express.Router();
const items = [
  { id: 1, name: 'Item 1', description: 'This is item one' },
  { id: 2, name: 'Item 2', description: 'This is item two' },
  { id: 3, name: 'Item 3', description: 'This is item three' },
  { id: 4, name: 'Item 4', description: 'This is item four' },
  { id: 5, name: 'Item 5', description: 'This is item five' },
  { id: 6, name: 'Item 6', description: 'This is item six' },
  { id: 7, name: 'Item 7', description: 'This is item seven' },
  { id: 8, name: 'Item 8', description: 'This is item eight' },
  { id: 9, name: 'Item 9', description: 'This is item nine' },
  { id: 10, name: 'Item 10', description: 'This is item ten' },
  { id: 11, name: 'Item 11', description: 'This is item eleven' },
  { id: 12, name: 'Item 12', description: 'This is item twelve' },
  { id: 13, name: 'Item 13', description: 'This is item thirteen' },
  { id: 14, name: 'Item 14', description: 'This is item fourteen' },
  { id: 15, name: 'Item 15', description: 'This is item fifteen' },
  { id: 16, name: 'Item 16', description: 'This is item sixteen' },
  { id: 17, name: 'Item 17', description: 'This is item seventeen' },
  { id: 18, name: 'Item 18', description: 'This is item eighteen' },
  { id: 19, name: 'Item 19', description: 'This is item nineteen' },
  { id: 20, name: 'Item 20', description: 'This is item twenty' },
  { id: 21, name: 'Item 21', description: 'This is item twenty-one' },
  { id: 22, name: 'Item 22', description: 'This is item twenty-two' },
  { id: 23, name: 'Item 23', description: 'This is item twenty-three' },
  { id: 24, name: 'Item 24', description: 'This is item twenty-four' },
  { id: 25, name: 'Item 25', description: 'This is item twenty-five' },
  { id: 26, name: 'Item 26', description: 'This is item twenty-six' },
  { id: 27, name: 'Item 27', description: 'This is item twenty-seven' },
  { id: 28, name: 'Item 28', description: 'This is item twenty-eight' },
  { id: 29, name: 'Item 29', description: 'This is item twenty-nine' },
  { id: 30, name: 'Item 30', description: 'This is item thirty' }
];

router.get('/items', (req, res) => {
setTimeout(() => {
    res.json(items);
}, 2000);
});

router.put('/items/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { name, description } = req.body;

  const index = items.findIndex(item => item.id === id);

  if (index === -1) {
    return res.status(404).json({ error: 'Item not found' });
  }

  items[index] = { ...items[index], name, description };

  res.json(items[index]);
});

router.delete('/items/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = items.findIndex(item => item.id === id);

  if (index === -1) {
    return res.status(404).json({ error: 'Item not found' });
  }

  const deleted = items.splice(index, 1)[0];
  res.json({ message: 'Item deleted', item: deleted });
});

module.exports = router;
