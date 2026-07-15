const { services: messageService } = require('../services/messages.service');

const controller = {
  getAll: async (req, res) => {
    const messages = await messageService.getAll();

    res.send(messages);
  },
  getById: async (req, res) => {
    const message = await messageService.getById(req.params.id);

    res.send(message);
  },
  create: async (req, res) => {
    const message = await messageService.create(req.body);

    res.send(message);
  },
  delete: async (req, res) => {
    const message = await messageService.delete(req.params.id);

    res.send(message);
  },
  update: async (req, res) => {
    const { id } = req.params;
    const { message } = req.body;

    await messageService.update(id, message);

    res.send(this.getById(id));
  },
};

module.exports = { controller };
