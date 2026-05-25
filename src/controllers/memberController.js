import prisma from "../prisma/client.js"

export async function createMember(req, res) {
  const member = await prisma.member.create({
    data: req.body
  })

  res.json(member)
}

export async function getMembers(req, res) {
  const members = await prisma.member.findMany()

  res.json(members)
}

export async function deleteMember(req, res) {
  const id = Number(req.params.id)

  await prisma.member.delete({
    where: {
      id
    }
  })

  res.send("Membro deletado")
}

export async function updateMember(req, res) {
  const id = Number(req.params.id)

  const member = await prisma.member.update({
    where: {
      id
    },
    data: req.body
  })

  res.json(member)
}