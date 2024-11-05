import { getUsers, addUser, updateUser, deleteUser } from '../db.js'
import bcrypt from 'bcrypt'

async function GetUsers(req, res) {
  res.send(await getUsers())
}

async function AddUser(req, res) {
  // const user = req.body
  // await addUser(user.nev, user.email)
  const { email, nev, jelszo, jelszoMegerosit } = req.body // email, nev
  const titkosJelszo = await bcrypt.hash(jelszo, 10)

  const ugyanaz = await bcrypt.compare(jelszoMegerosit, titkosJelszo)

  if (!ugyanaz) {
    res.status(400).send('Nem ugyanaz a ket jelszo')
    return
  }

  await addUser(nev, email, titkosJelszo)
  res.send('Megerkezett valasz')
}

async function UpdateUser(req, res) {
  const id = req.params.hozzaszolasid
  const { email, nev } = req.body // email, nev
  res.send(await updateUser(id, nev, email))
}

async function DeleteUser(req, res) {
  const { id } = req.params
  res.send(await deleteUser(id))
}

export const userController = {
  GetUsers,
  AddUser,
  UpdateUser,
  DeleteUser
}
