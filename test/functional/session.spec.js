const { test, trait } = use('Test/Suite')('Session');
const Factory = use('Factory')

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const User = use('App/Models/User');

trait('Test/ApiClient')

test('Atenticado com token JWT?',async ({ assert, client }) => {
  const sessionPayload ={
    email: 'vitor.procont@gmail.com',
    password: '123456'
  }

  const user = await Factory
    .model('App/Models/User')
    .create(sessionPayload);

  const response = await client
    .post('/sessions')
    .send(sessionPayload)
  .end();

  response.assertStatus(200);
  assert.exists(response.body.token);

})
