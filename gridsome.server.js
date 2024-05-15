// Server API makes it possible to hook into various parts of Gridsome
// on server-side and add custom data to the GraphQL data layer.
// Learn more: https://gridsome.org/docs/server-api/

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`
let slugify = require('slugify');
let jsonData = require('./src/data/house.json');


module.exports = function (api) {

  api.loadSource(({ addCollection }) => {
    // Use the Data Store API here: https://gridsome.org/docs/data-store-api/
    const collection = addCollection('Units')

    for (const item of jsonData) {
      let cost = item.renting ? item.renting_cost : (item.selling ? item.selling_cost : 'consultar');
      let contract = item.renting ? 'rent' : (item.selling ? 'sell' : 'consultar');
      let slug = slugify(String(item.title), { lowercase: true });

      collection.addNode({
        id: item.id,
        slug,
        status: item.raw_status, // reserved | available
        title: item.title,
        description: item.description,
        contract, // rent | sell
        cost,
        tags: item.tags || [],
        kind: item.kind, // piso | ático | plaza de parking | estudio | dúplex | casa / chalet | terreno
        location: {
          town: item.town,
          neighborhood: item.neighborhood || '',
          district: item.district || '',
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
          certificate_display: item.energy_certificate_display
        }
      })
    }
  }),

    api.createPages(async ({ createPage, graphql }) => {
      const MIN_UNITS = 3
      const { data } = await graphql(`
      {
        allUnits {
          edges {
            node {
              id,
              slug,
              status,
              title,
              description,
              contract,
              cost,
              tags,
              kind,
              location {
                neighborhood,
                district,
                town,
                province,
                street,
                zip,
                geo_lat,
                geo_lng,
              },

              bedrooms,
              bathrooms,
              floor,
              area,
              pictures,
              videos,
              energy {
                consumption,
                emission,
                certificate_display,
              }
            }
          }
        }
      }
      `);

      const allUnits = data.allUnits.edges.map(edge => edge.node)

      const allLocationPaths = {}
      allUnits.forEach(unit => {
        let path = `/${slugify(unit.location.town)}`
        if (!allLocationPaths[path])
          allLocationPaths[path]=[unit]
        else
          allLocationPaths[path].push(unit)

        if(unit.location.district){
          path = `/${slugify(unit.location.town)}/${slugify(unit.location.district)}`
          if (!allLocationPaths[path])
            allLocationPaths[path]=[unit]
          else
            allLocationPaths[path].push(unit)
        }

        if(unit.location.district && unit.location.neighborhood){
          path = `/${slugify(unit.location.town)}/${slugify(unit.location.district)}/${slugify(unit.location.neighborhood)}`
          if (!allLocationPaths[path])
            allLocationPaths[path]=[unit]
          else
            allLocationPaths[path].push(unit)
        }else if(unit.location.neighborhood){
          path = `/${slugify(unit.location.town)}/${slugify(unit.location.neighborhood)}`
          if (!allLocationPaths[path])
            allLocationPaths[path]=[unit]
          else
            allLocationPaths[path].push(unit)
        }
      })

      Object.keys(allLocationPaths).forEach(path => {
        createPage({
          path,
          component: './src/templates/List.vue',
          context: {
            units: allLocationPaths[path],
            allUnits,
            hero: true
          },
        });

      })

      // Object.keys(cities).forEach(c => {
      //   const [city, district, neighborhood] = c.split('_');

      //   const features = ['',
      //     // bedrooms
      //     'estudio',      
      //     'una-habitacion',     
      //     'dos-habitaciones',     
      //     'tres-habitaciones',      
      //     'cuatro-habitaciones',      
      //     'alquiler-por-meses',
      //     'amueblado',
      //     'sin-amueblar',
      //     'con-ascensor',
      //     'admite-mascotas',
      //     'aire-acondicionado',
      //     'con-garaje',
      //     'con-piscina',
      //     'atico',
      //     'bajos'];
      //   // cities
      //   if (city) {
      //     features.forEach(type => {
      //         let sufix = (type == '') ? '' : '/' + type;
      //         createPage({
      //         path: `/${slugify(city.toLowerCase())}${sufix}`,
      //         component: './src/templates/List.vue',
      //         context: {
      //           city,
      //           units: cities[city],
      //           hero: true,
      //           searchType: 'city'
      //         },
      //       });
      //     })
      //   }
      //   // districts
      //   (district && district != '#') && createPage({
      //     path: `/${slugify(city.toLowerCase())}/${slugify(district.toLowerCase())}`,
      //     component: './src/templates/List.vue',
      //     context: {
      //       city,
      //       units: cities[`${city}_${district}`],
      //       hero: true,
      //       searchType: 'district',
      //     },
      //   });
      //   // neighborhoods
      //   neighborhood && createPage({
      //     path: `/${slugify(city.toLowerCase())}/${district == '#' ? '' : slugify(district.toLowerCase())+'/'}${slugify(neighborhood.toLowerCase())}`,
      //     component: './src/templates/List.vue',
      //     context: {
      //       city,
      //       units: cities[`${city}_${district == '#' ? '' : district + '_'}${neighborhood}`],
      //       hero: true,
      //       searchType: 'neighborhood',
      //     },
      //   });
      // });

      allUnits.forEach(unit => {
        createPage({
          path: `/${unit.slug}`,
          component: './src/templates/Detail.vue',
          context: {
            id: unit.id,
            ...unit,
            allUnits
          }
        })
      })
    })
}
