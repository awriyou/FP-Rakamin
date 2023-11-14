const { expressjwt: jwt } = require('express-jwt');

function authJwt() {
  const secret = process.env.secret;
  const api = process.env.API_URL;
  return jwt({
    secret,
    algorithms: ['HS256'],
    isRevoked: isRevoked,
  }).unless({
    //!fungsi path dibawah ini saya gunain buat ngehalang authjwt biar gakena ke dia.
    path: [
      //   { url: `${api}/products`, methods: ['GET', 'OPTIONS'] }, //? contoh untuk menspesifikan method dari router nya.
      { url: /\/public\/uploads(.*)/, methods: ['GET', 'OPTIONS'] }, //Membuka endpoint images dan image untuk bebas diakses oleh user
      { url: /\/api\/v1\/products(.*)/, methods: ['GET', 'OPTIONS'] }, //disini akan digunakan regular expression buat menspesifikan semua router get yang ada di endpoint product
      { url: /\/api\/v1\/categories(.*)/, methods: ['GET', 'OPTIONS'] },
      `${api}/users/login`,
      `${api}/users/register`,
    ],
    //? jadi kondisinya disini adalah admin bisa mengakses semua router, costumer bisa mengakses semua routers YANG metodenya get DIDALAM products dan category serta login dan register
  });
}

// fungsi ini digunakan untuk filter role, admin atau bukan, kalau admin berarti bisa menggunakan semua nya, kalo user doang cuma bisa get. tentu nya dengan syarat harus memasukan token
// Payload dibawah ini diambil dari inisialisasi jwt sign key
// async function isRevoked(req, payload, done) {
//   if (!payload.isAdmin) {
//     done(null, true);
//   }
//   done();
// }

async function isRevoked(req, token) {
  if (token.payload.isAdmin === false) {
    return true;
  }
  return false;
}
//! intinya kalo mau ngapa ngapain selain get, data user isAdmin harus true.
module.exports = authJwt;
