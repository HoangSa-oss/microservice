import request from 'supertest';
import { app } from '../../app';
import {Ticket} from '../../models/ticket'
it('updates the ticket provided valid inputs', async () => {
    const cookie = global.signin();
  
    const response = await request(app)
      .post('/api/tickets')
      .set('Cookie', cookie)
      .send({
        title: 'asldkfj',
        price: 20,
      });
  
    await request(app)
      .put(`/api/tickets/${response.body.id}`)
      .set('Cookie', cookie)
      .send({
        title: 'new title',
        price: 100,
      })
      .expect(200);
  
    const ticketResponse = await request(app)
      .get(`/api/tickets/${response.body.id}`)
      .send();
  
    expect(ticketResponse.body.title).toEqual('new title');
    expect(ticketResponse.body.price).toEqual(100);
  });