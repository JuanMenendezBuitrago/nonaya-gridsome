// Server API makes it possible to hook into various parts of Gridsome
// on server-side and add custom data to the GraphQL data layer.
// Learn more: https://gridsome.org/docs/server-api/

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`
var slugify = require('slugify');
var data =require('./src/data/house.json');


module.exports = function (api) {
  api.loadSource(({ addCollection }) => {
    // Use the Data Store API here: https://gridsome.org/docs/data-store-api/

    const collection = addCollection('Unit')

    for (const item of data) {
      let cost = item.renting ? item.renting_cost : (item.selling ? item.selling_cost : 'consultar');
      let contract = item.renting ? 'rent' : (item.selling ? 'sell' : 'consultar');
      let slug = slugify(String(item.title));
      console.log(item.raw_status);
      collection.addNode({
        id: item.id,
        slug,
        status: item.raw_status,
        title: item.title,
        description: item.description,
        contract,
        cost,
        kind: item.kind,
        location: {
          town: item.town,
          province: item.province,
          street: item.street,
          zip: item.zip_code,
          geo_lat: item.geo_lat,
          geo_lng: item.geo_lng,
        },

        bedrooms: item.bedrooms,
        bathrooms: item.bathrooms,
        floor: item.floor,
        area: item.area,
        pictures: item.pictures,
        videos: item.videos,
        energy: {
          consumption: item.energy_consumption,
          emission: item.energy_emission,
          certificate_display:item.energy_certificate_display
        }


      })
    }
  }),

  api.createPages(({ createPage }) => {
    // Use the Pages API here: https://gridsome.org/docs/pages-api/
    data.forEach(unit => {
      createPage({
        path: `/${slugify(String(unit.title))}`,
        component: './src/templates/Unit.vue',
        context: {
          id: unit.id
        }
      })
    })
  })
}
