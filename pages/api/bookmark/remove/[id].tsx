import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import prisma from '../../../../lib/prisma';

export default async function (req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req });

  if (session?.user?.email) {
    const result = await prisma.article.update({
      where: {
        id: Number(req.query.id),
      },
      data: {
        users: {
          disconnect: {
            email: session.user.email,
          },
        },
      },
    });
    res.json(result);
  } else {
    res.status(401).send({ message: 'Unauthorized' });
  }
}
