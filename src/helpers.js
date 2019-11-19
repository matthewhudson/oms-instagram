const axios = require('axios')

module.exports.getUserFeed = async username => {
  return axios
    .get(`https://www.instagram.com/${username}/?__a=1`)
    .then(response => {
      const media = response.data.graphql.user.edge_owner_to_timeline_media.edges

      media.sort((a, b) => a.taken_at_timestamp - b.taken_at_timestamp)
      const photos = media.map(e => {
        // const media = e.node;
        return {
          display_url: e.node.display_url,
          taken_at_timestamp: e.node.taken_at_timestamp,
          owner: {
            id: e.node.owner.id, // '51839789',
            username: e.node.owner.username // 'mardenanquim'
          },
          likes: e.node.edge_liked_by.count,
          comments: e.node.edge_media_to_comment.count
        }
      })
      return { username, photos }
    })
    .catch(er => {
      // handle error
      console.log(er)
    })
}
