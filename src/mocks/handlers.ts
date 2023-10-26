import { rest } from 'msw';

export const handlers = [
  rest.get('/login', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        groupName: '롯데월드 어드벤쳐 부산',
        userName: '라이언',
        members: [
          {
            memberId: 1,
            name: '라이언',
            isAdmin: true,
          },
          {
            memberId: 2,
            name: '어피치',
            isAdmin: false,
          },
        ],
      }),
    );
  }),
];
