const express = require('express');
const { Carnet } = require('./models');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

// GET toout carnets
app.get('/api/carnets', async (req, res) => {
  try {
    const carnets = await Carnet.findAll();
    res.json(carnets);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET un seul carnet
app.get('/api/carnets/:id', async (req, res) => {
  try {
    const carnet = await Carnet.findByPk(req.params.id);
    if (carnet) {
      res.json(carnet);
    } else {
      res.status(404).json({ message: 'Carnet non trouvé' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// CREATE un carnet
app.post('/api/carnets', async (req, res) => {
  const { numero, nom, prenom, photo, adresse } = req.body;

  try {
    const carnet = await Carnet.create({
      numero,
      nom,
      prenom,
      adresse,
      photo
    });
    res.status(201).json(carnet);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// UPDATE un carnet
app.put('/api/carnets/:id', async (req, res) => {
  const { numero, nom, prenom, photo, adresse } = req.body;

  try {
    const carnet = await Carnet.findByPk(req.params.id);
    if (carnet) {
      carnet.numero = numero || carnet.numero;
      carnet.nom = nom || carnet.nom;
      carnet.prenom = prenom || carnet.prenom;
      carnet.adresse = adresse || carnet.adresse;
      carnet.photo = photo || carnet.photo;
      await carnet.save();
      res.json(carnet);
    } else {
      res.status(404).json({ message: 'Carnet non trouvé' });
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE un carnet
app.delete('/api/carnets/:id', async (req, res) => {
  try {
    const carnet = await Carnet.findByPk(req.params.id);
    if (carnet) {
      await carnet.destroy();
      res.json({ message: 'Carnet supprimé' });
    } else {
      res.status(404).json({ message: 'Carnet non trouvé' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
