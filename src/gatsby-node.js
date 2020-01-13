const fetch = require("node-fetch")
exports.sourceNodes = async (
  { actions, createNodeId, createContentDigest },
  options
  ) => {
    try {
          const { apiKey } = options
          const { baseUrl } = options
          const { rowLimits } = options
          let actData;
          if(rowLimits)
          {
            var { limit } = rowLimits
            var  { limitstart } = rowLimits
          }
          else
          {
            var limit = 0;
            var limitstart = 0;
          }
        const res = await fetch(baseUrl + "&limitstart=" + limit + "&limit=" + limitstart)
        const resData = await res.json();
        console.log(resData)
        resData.data.data.results.forEach(articles => {
            const node = {
              ...articles,
              id: createNodeId(`AllJoomlaArticles${articles.id}`),
              internal: {
                type: "JoomlaArticle",
                contentDigest: createContentDigest(articles),
              },
            }
            actions.createNode(node)
          })
        } catch (error) {
    console.log(error)
  }
}
