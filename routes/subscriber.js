const express = require('express');

const router = express.Router()
const axios = require("axios");
const API_KEY = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI0IiwianRpIjoiZmNmNzMxY2NlMjg5MTM1MTMyYTk0YzgxNTg2MzUwYTAzZTNmOGU3M2U0N2VhMWNhOTBiMTIxZGZmZjcxMGYxMGYyYmZkYTBlZjIyZWIzZTAiLCJpYXQiOjE3MzA2OTExODQuMTcyOTM4LCJuYmYiOjE3MzA2OTExODQuMTcyOTQzLCJleHAiOjQ4ODYzNjQ3ODQuMTY4ODM3LCJzdWIiOiIxMTg0MzYyIiwic2NvcGVzIjpbXX0.Vs2b3S3NVpz223F3k2apCXt3Gen7BWlf91EHal_p70-f83e9Nq8-U3aPVrKt_g9m6slZvG3hrtqBtSHDCsci7X94kBh7cV7_KBAKPYbjV9apEuks1BPqkQrsEl_Rrl_TfjcbMAvWWnLhHo_iB2iyStag4B_xDJCvQyKDPaagXiB7fTD6yH5lDqwItNAIq_8IHEoN6RMJyJ-ZJLU3XCEUR3K6Y2gYMf-4W57Qw5xNpnh1QMlRk42cL71kn1MUtELvyvVZy1MHeJ2cXZ3mhtKun6BYtGGY_k6HnodITn_Za1CfxORASoTos5YXCj84J0A0ZrUSECXnxOY4KUPaLnlOMbi3wGIuEv9Pzn1RxY0WeeOknZSjKIAmeAsCYUNuEBF7Sr8bS-puy9mgXBeCqVu8-TZTxmlkcqld9io_uZKlIZlzFU39StTMAoG3Rc_WvCX_S0YkUUxS1TZG0cyQY3YeEbTtsmMh8sXuHVkAwQeTCX2CxTkAL26kgTYETZdMxCkwRty7Jvc2x36doOVDD5RDjVcsFwM2y4iHwYUluhymJ0DoRyxjDyz0Hn43SeUmQ5zXs6jCpH_vrYLx2pBi5I72FxR_-S0j_3TJJWdvbxEI2gVxwec3T8w7SgiHnltxGZ3kbEHpDUu5fDSkT9OvP4a3bljovWJnDTh0KelFR8rsfDQ";
const BASE_URL = "https://api.mailerlite.com/api/v2";

router.post("/subscribe", async (req, res) => {
  const { email, name } = req.body;

  try {
    // Send subscription request to MailerLite
    await axios.post(
      `${BASE_URL}/subscribers`,
      { email, name, resubscribe: true },
      {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    res.status(200).json({ message: "Subscription successful!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to subscribe." });
  }
});
module.exports = router
