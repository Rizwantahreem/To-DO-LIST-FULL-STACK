import * as joi from "joi";

const validateCreateTask = (body) => {
  const taskObject = joi.object({
    id: joi.string().required(),
    user: joi.string().required(),
    date: joi.date().required(),
    dueDate: joi.date().required(),
    taskName: joi.string().required(),
    taskDesc: joi.string().required(),
    priority: joi.string().required(),
    status: joi.string().required(),
    tags: joi.string().optional(),
  });
  const { error } = taskObject.validate(body);
  return error ? false : true;
};
const validateUpdateTask = (body) => {
  const taskObject = joi.object({
    id: joi.string().optional(),
    user: joi.string().optional(),
    date: joi.date().optional(),
    dueDate: joi.date().optional(),
    taskName: joi.string().optional(),
    taskDesc: joi.string().optional(),
    priority: joi.string().optional(),
    status: joi.string().optional(),
    tags: joi.string().optional(),
  });
  const { error } = taskObject.validate(body);
  return error ? false : true;
};
export default { validateCreateTask, validateUpdateTask };
