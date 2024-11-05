import pg from 'pg'

const { Client } = pg

const client = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'styxa',
  password: 'postgres',
  port: 5432
})

await client.connect()

export function createUser() {
  client.query(`
    CREATE TABLE IF NOT EXISTS felhasznalok (
        id INT GENERATED ALWAYS AS IDENTITY,
        nev VARCHAR(100) NOT NULL,
        email VARCHAR(100),
        jelszo VARCHAR(100),
        datum TIMESTAMP,
        PRIMARY KEY (id)
    )`)
}

export function createCikkek() {
  client.query(`
    CREATE TABLE IF NOT EXISTS cikkek (
      cikkID INT GENERATED ALWAYS AS IDENTITY,
      cikkCim VARCHAR(40),
      cikkDatum TIMESTAMP,
      szerzoID INT,
      szoveg VARCHAR(255),

      PRIMARY KEY (cikkID),
      CONSTRAINT fk_szerzoID FOREIGN KEY (szerzoID) REFERENCES felhasznalok(id)
    )`)
}

export async function addCikkek(cim, szerzoID, szoveg) {
  await client.query(`
   INSERT INTO cikkek(cikkID, cikkCim,cikkDatum,szerzoID,szoveg)  
   VALUES(DEFAULT,'${cim}',NOW(),${szerzoID},'${szoveg}') `)
}

export async function addUser(nev, email, jelszo) {
  await client.query(`
        INSERT INTO felhasznalok (id, nev, email, jelszo, datum)
        VALUES (default, '${nev}', '${email}', '${jelszo}', NOW())
        `)
}

export async function getCikkek() {
  const cikkek = await client.query(`SELECT * FROM cikkek`)
  return cikkek.rows
}

export async function getUsers() {
  const users = await client.query(`SELECT * FROM felhasznalok`)
  return users.rows
}

export async function updateCikkek(cikkCim, cikkID) {
  return await client.query(`
    UPDATE cikkek
    SET cikkCim='${cikkCim}'
    WHERE cikkID=${cikkID}`)
}

export async function updateUser(id, nev, email) {
  const user = await client.query(`
      UPDATE felhasznalok
      SET nev = '${nev}', email = '${email}'
      WHERE id = ${id}
    `)
  return user.rows
}

export async function deleteUser(id) {
  const users = await client.query(`
    DELETE FROM felhasznalok
    WHERE id = ${id}
    `)
  return users.rows
}

export async function deleteCikkek(id) {
  const cikkek = await client.query(`
    DELETE FROM cikkek
    WHERE cikkID = ${id}
  `)
  return cikkek.rows
}
