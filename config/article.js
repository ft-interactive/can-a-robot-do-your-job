export default () => ({ // eslint-disable-line

  // link file UUID
  id: '80790ae0-131a-11e7-80f4-13e067d5072c',

  // canonical URL of the published page
  // https://ig.ft.com/can-a-robot-do-your-job get filled in by the ./configure script
  url: 'https://ig.ft.com/can-a-robot-do-your-job',

  // To set an exact publish date do this:
  //       new Date('2016-05-17T17:11:22Z')
  publishedDate: new Date(),

  headline: 'Can a robot do your job?',

  // summary === standfirst (Summary is what the content API calls it)
  summary: 'Find out how much of your job can technically be automated.',

  topic: {
    name: 'Artificial Intelligence and Robotics',
    url: '/foo',
  },

  relatedArticle: {
    // text: 'Related article »',
    // url: 'https://en.wikipedia.org/wiki/Politics_and_the_English_Language',
  },

  mainImage: {
    title: '',
    description: '',
    url: '',
    width: 2048, // ensure correct width
    height: 1152, // ensure correct height
  },

  // Byline can by a plain string, markdown, or array of authors
  // if array of authors, url is optional
  byline: [
    { name: 'Robin Kwong', url: 'https://www.ft.com/stream/authorsId/Q0ItZGIwM2YzMg==-QXV0aG9ycw==' },
    { name: 'Joanna S Kao', url: 'https://www.ft.com/stream/authorsId/NWRlMDQ0Y2MtODA3Mi00N2VlLWEyZGItNWRmYTZhNDNiNWNi-QXV0aG9ycw==' },
    { name: 'Claire Manibog', url: 'https://www.ft.com/stream/authorsId/ZGVhNjk2NmEtN2ZkNy00NDllLTkyODAtYjE2NWNmNjg0NTcx-QXV0aG9ycw==' },
  ],

  // Appears in the HTML <title>
  title: 'What parts of your work can be automated?',

  // meta data
  description: 'Interactive calculator by the Financial Times that shows how much of your job can technically be done by a robot',

  /*
  TODO: Select Twitter card type -
        summary or summary_large_image

        Twitter card docs:
        https://dev.twitter.com/cards/markup
  */
  twitterCard: 'summary_large_image',

  /*
  TODO: Do you want to tweak any of the
        optional social meta data?
  */
  // General social
  socialImage: 'https://www.ft.com/__origami/service/image/v2/images/raw/http%3A%2F%2Fim.ft-static.com%2Fcontent%2Fimages%2F553de71a-1a2c-11e7-bcac-6d03d067f81f.img?source=ig&width=1200',
  socialHeadline: 'Here’s how much of your job can be done by a robot',
  // socialSummary: '',

  // TWITTER
  twitterImage: 'https://www.ft.com/__origami/service/image/v2/images/raw/http%3A%2F%2Fim.ft-static.com%2Fcontent%2Fimages%2F553de71a-1a2c-11e7-bcac-6d03d067f81f.img?source=ig&width=1200',
  // twitterCreator: '@individual's_account',
  tweetText: 'Here’s how much of your job can be done by a robot',
  twitterHeadline: 'Can a robot do your job?',

  // FACEBOOK
  facebookImage: 'https://www.ft.com/__origami/service/image/v2/images/raw/http%3A%2F%2Fim.ft-static.com%2Fcontent%2Fimages%2F553de71a-1a2c-11e7-bcac-6d03d067f81f.img?source=ig&width=1200',
  facebookHeadline: 'Can a robot do your job?',

  tracking: {

    /*

    Microsite Name

    e.g. guffipedia, business-books, baseline.
    Used to query groups of pages, not intended for use with
    one off interactive pages. If you're building a microsite
    consider more custom tracking to allow better analysis.
    Also used for pages that do not have a UUID for whatever reason
    */
    // micrositeName: '',

    /*
    Product name

    This will usually default to IG
    however another value may be needed
    */
    // product: '',
  },
});
