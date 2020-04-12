const app = require('express')();
const User = require("../model/User");
const cookieSession = require('cookie-session');
const jwt = require('jsonwebtoken');
const SparkPost = require('sparkpost');
const client = new SparkPost(process.env.MAILING);


exports.create = async function (req, res, next)
{
  const auth = req.body.auth;
  const password = req.body.password;
  try
  {
    const user = await User.authenticate(auth, password);
    if (user)
    {
      const token = await jwt.sign({ user: user._id }, "secret key")
      res.json({ token });
      res.status(204).send({ msg: 'ok log in' });
    } else
    {
      res.status(401).send({});
    }
  } catch (err)
  {
    console.log(err);
    res.status(400).send({ error: 'Authentication failed.' });
  }
}

exports.logOut = async function (req, res)
{
  req.session = null;
}

exports.mail = async (req, res) =>
{
  const params = req.params;
  try
  {
    client.transmissions
      .send({
        content: {
          from: 'cm-punk-619@hotmail.com',
          subject: 'Hello, World!',
          html:
            "<html><body><p>My cool email.</p></body></html>"
        },
        recipients: [{ address: 'cm-punk-619@hotmail.com' }]
      }).then(res.status(204).send({}))
  }
  catch (e)
  {
    res.status(400).send({ error: 'Send Mail Fail.' });
  }
}