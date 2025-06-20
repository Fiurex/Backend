import {
  createService,
  readAllService,
  readByIdService,
  updateByIdService,
  destroyByIdService,
} from "../services/products.service.js";

const create = async (req, res) => {
  const data = req.body;
  data.owner_id = req.user._id;
  const response = await createService(data);
  res.json201(response);
};

const readAll = async (req, res) => {
  const filter = req.query;
  const response = await readAllService(filter);
  if (response.length === 0) {
    res.json404();
  }
  res.json200(response);
};

const readById = async (req, res) => {
  const { id } = req.params;
  const response = await readByIdService(id);
  if (response.length === 0) {
    res.json404();
  }
  res.json200(response);
};

const updateById = async (req, res) => {
  const { id } = req.params;
  const data = req.body;
  const response = await updateByIdService(id, data);
  if (response.length === 0) {
    res.json404();
  }
  res.json200(response);
};

const destroyById = async (req, res) => {
  const { id } = req.params;
  const response = await destroyByIdService(id);
  if (response.length === 0) {
    res.json404();
  }
  res.json200(response);
};

export { create, readAll, readById, updateById, destroyById };
