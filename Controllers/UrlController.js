const axios = require('axios')
const API_KEY_IPSCORE = process.env.API_KEY_IPSCORE
const API_KEY_SSLAYER = process.env.API_KEY_SSLAYER

const helper = require('../middleware/helper')
const UrlsModels = require('../Models/Urls.models')

const ipscoreLookUp = async (url) => {
  try {
    const response = await axios.get(
      `https://ipqualityscore.com/api/json/url?key=${API_KEY_IPSCORE}&url=${url}`,
      
    )
    console.log('ipscore')
    console.log(response.data)
    return response.data
  } catch (error) {
    console.log(error)
  }
}

const ssLayerLookUp = async (url) => {
  try {
    const response = await axios.get(
      `http://api.screenshotlayer.com/api/capture?access_key=${API_KEY_SSLAYER}&url=${url}&viewport=1440x900`,
    )

    console.log('ss')
    return response.config.url
  } catch (error) {
    console.log(error)
  }
}

const mlModelLookUp = async (url) => {
  try {
    const response = await axios.post(
      // 'https://orwellian-ai-ml.onrender.com/predict',
      //'http://ec2-3-87-196-16.compute-1.amazonaws.com:5000/predict',
      'http://127.0.0.1:5000/predict',
      {
        url: url,
      },
    )

    console.log('ml')
    return response.data.result
  } catch (error) {
    console.error(error)
  }
}

const checkUrl = async (req, res) => {
  try {
    const user_id = req.user._id
    await UrlsModels.create({url: req.body.url, user_id: user_id})
    console.log('before sending')
    const ipscore_result = await ipscoreLookUp(req.body.url)
    const sslayer_result = await ssLayerLookUp(req.body.url)
    const ml_result = await mlModelLookUp(req.body.url)
    const final_ml_result = await helper.helper(ml_result, ipscore_result)
    console.log('after sending')
    res.json({
      ss: sslayer_result,
      urlInfo: ipscore_result,
      ml: final_ml_result,
    })
  } catch (error) {
    res.status(401).json({
      msg: error
    })
  }
}

const getUrls = async (req, res) => {
  try {
    const user_id = req.user._id
    const urls = await UrlsModels.find({ user_id }).sort({createdAt: -1})
    res.status(200).json({
      urls: urls
    })
  } catch (error) {
    res.status(401).json({
      msg: error
    })
  }
}

module.exports = { checkUrl, getUrls }
// const axios = require('axios');
// const API_KEY_IPSCORE = process.env.API_KEY_IPSCORE;
// const API_KEY_SSLAYER = process.env.API_KEY_SSLAYER;

// const helper = require('../middleware/helper');
// const UrlsModels = require('../Models/Urls.models');

// const ipscoreLookUp = async (url) => {
//   try {
//     const response = await axios.get(
//       `https://ipqualityscore.com/api/json/url?key=${API_KEY_IPSCORE}&url=${url}`
//     );
//     console.log('ipscore')
//     return response.data;
//   } catch (error) {
//     console.error(error);
//     throw error; // Re-throw the error to be caught in the caller function
//   }
// };

// const ssLayerLookUp = async (url) => {
//   try {
//     const response = await axios.get(
//       `http://api.screenshotlayer.com/api/capture?access_key=${API_KEY_SSLAYER}&url=${url}&viewport=1440x900`
//     );
//     console.log('ss')
//     return response.config.url;
//   } catch (error) {
//     console.error(error);
//     throw error;
//   }
// };

// const mlModelLookUp = async (url) => {
//   try {
//     const response = await axios.post(
//       // 'https://orwellian-ai-ml.onrender.com/predict',
//       // 'https://orwellian-ai-ml-1.onrender.com/predict',
//       'http://ec2-3-87-196-16.compute-1.amazonaws.com:8080/predict',
//       // 'https://orwellian-ai-ml-2.onrender.com/predict',
//       {
//         url: url,
//       }
//     );
//     console.log(response.data.result)
//     return response.data.result;
//   } catch (error) {
//     console.error(error);
//     throw error;
//   }
// };

// const checkUrl = async (req, res) => {
//   try {
//     const user_id = req.user._id;
//     await UrlsModels.create({ url: req.body.url, user_id: user_id });

//     console.log('before sending')
//     const [ipscore_result, sslayer_result, ml_result] = await Promise.all([
//       ipscoreLookUp(req.body.url),
//       ssLayerLookUp(req.body.url),
//       mlModelLookUp(req.body.url),
//     ]);
//     console.log('after sending')

//     const final_ml_result = helper.helper(ml_result, ipscore_result);

//     res.json({
//       ss: sslayer_result,
//       urlInfo: ipscore_result,
//       ml: final_ml_result,
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({
//       msg: 'An error occurred',
//     });
//   }
// };

// const getUrls = async (req, res) => {
//   try {
//     const user_id = req.user._id;
//     const urls = await UrlsModels.find({ user_id }).sort({ createdAt: -1 });
//     res.status(200).json({
//       urls: urls,
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({
//       msg: 'An error occurred',
//     });
//   }
// };

// module.exports = { checkUrl, getUrls };

