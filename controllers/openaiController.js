const { Configuration, OpenAIApi } = require('openai');

const apiKey = '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';

const configuration = new Configuration({
  apiKey: apiKey,
});

const openai = new OpenAIApi(configuration);

const generateImage = async (req, res) => {
  const { prompt, size } = req.body;

  const imageSize =
    size === 'small' ? '256x256' : size === 'medium' ? '512x512' : '1024x1024';

  try {
    console.log('Before OpenAI API call');
    const response = await openai.createImage({
      prompt,
      n: 1,
      size: imageSize,
    });
    console.log('After OpenAI API call:', response.data);

    const imageUrl = response.data.data[0].url;

    res.status(200).json({
      success: true,
      data: imageUrl,
    });
  } catch (error) {
    if (error.response) {
      console.log(error.response.status);
      console.log(error.response.data);
    } else {
      console.log(error.message);
    }
    console.log('Incoming request to generateImage:', req.body);
    res.status(400).json({
      success: false,
      error: 'The image could not be generated',
    });
  }
};

module.exports = { generateImage };
