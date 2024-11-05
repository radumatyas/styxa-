import { addCikkek, deleteCikkek, getCikkek, updateCikkek } from '../db.js'
import Joi from 'joi'

const addRule = Joi.object({
  cim: Joi.string().required().min(3),
  szoveg: Joi.string().required().min(5).max(100),
  szerzoID: Joi.number().required()
})

const updateRule = Joi.object({
  cim: Joi.string().required().min(3),
  cikkID: Joi.number().required()
})

async function GetArticle(req, res) {
  res.send(await getCikkek())
}

async function AddArticle(req, res) {
  try {
    const { cim, szerzoID, szoveg } = await addRule.validateAsync(req.body)
    await addCikkek(cim, szerzoID, szoveg)
    res.send('Letrehoztam a cikket')
  } catch (error) {
    res.status(400).send(error)
  }
}

async function UpdateArticle(req, res) {
  try {
    const { cim, cikkID } = await updateRule.validateAsync(req.body)
    await updateCikkek(cim, cikkID)
    res.send('Frissitettem a cikket')
  } catch (error) {
    res.status(400).send(error)
  }
}

async function DeleteArticle(req, res) {
  const { cikkID } = req.params
  await deleteCikkek(cikkID)
  res.send('Kitoroltem a cikket')
}

export const articleController = {
  GetArticle,
  AddArticle,
  UpdateArticle,
  DeleteArticle
}
