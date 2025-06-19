import { productsRepository } from "../repositories/repository.js";


const createService = async (data) => await Repository.create(data);
const readAllService = async (filter) => await Repository.readAll(filter);
const readByIdService = async (id) => await Repository.readById(id);
const updateByIdService = async (id, data) => await Repository.updateById(id, data);
const destroyByIdService = async (id) => await Repository.destroyById(id);

export {
  createService,
  readAllService,
  readByIdService,
  updateByIdService,  
  destroyByIdService,
};