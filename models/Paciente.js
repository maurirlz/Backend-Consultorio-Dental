/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */
const mongoose = require('mongoose');

mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

const pacienteSchema = new mongoose.Schema({
  nombreCompleto: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50,
  },
  passwordHasheada: {
    type: String,
    required: true,
    minlength: 8,
  },
  DNI: {
    type: String,
    required: true,
    minlength: 8,
    maxlength: 9,
    unique: true,
  },
  edad: {
    type: Number,
    min: 0,
    max: 100,
  },
  fechaNacimiento: {
    type: String,
    required: true,
  },
  numeroTelefono: {
    type: String,
    minlength: 8,
    maxlength: 15,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    minlength: 10,
  },
  obraSocial: {
    type: String,
    required: true,
  },
  rol: {
    type: Number,
    required: true,
    default: 0,
  },
  turnosProximos: [
    {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Turno',
    },
  ],
  historiaClinica: [
    {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Consulta',
    },
  ],
});

pacienteSchema.set('toJSON', {
  transform: (document, returnedPaciente) => {
    returnedPaciente.id = returnedPaciente._id.toString();

    delete returnedPaciente._id;
    delete returnedPaciente.__v;
    delete returnedPaciente.passwordHasheada;
  },
});

module.exports = mongoose.model('Paciente', pacienteSchema);
