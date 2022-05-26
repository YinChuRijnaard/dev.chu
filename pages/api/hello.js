// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
  res.status(200).json({ name: "John Doe" });
}

/*
  NOTES
  * Only executes on the server
  * Will not add to the JS bundle size
*/
