import express from "express";
import { PrismaClient } from "@prisma/client";
import cors from "cors";

const prisma = new PrismaClient();
const app = express();
app.use(express.json());
app.use(cors("http://localhost:5173/"));

app.post("/users", async (req, res) => {
  const { email, name, age } = req.body;

  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    return res.status(409).json({ message: "E-mail já cadastrado" });
  }

  await prisma.user.create({
    data: { email, name, age },
  });

  res.status(201).json(req.body);
});

app.get("/users", async (req, res) => {
  let users = [];
  if (req.query) {
    users = await prisma.user.findMany({
      where: {
        name: req.query.name,
        email: req.query.email,
        age: req.query.age,
      },
    });
  } else {
    users = await prisma.user.findMany();
  }

  res.status(200).json(users);
});

app.put("/users/:id", async (req, res) => {
  const { email, name, age } = req.body;

  await prisma.user.update({
    where: { id: req.params.id },
    data: { email, name, age },
  });

  res.status(201).json(req.body);
});

app.delete("/users/:id", async (req, res) => {
  await prisma.user.delete({
    where: {
      id: req.params.id,
    },
  });
  res.status(200).json({ message: "User deleted" });
});

app.listen(3000);
