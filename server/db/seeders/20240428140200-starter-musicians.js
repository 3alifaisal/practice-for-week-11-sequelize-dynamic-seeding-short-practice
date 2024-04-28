'use strict';
const {Musician, Band} = require("../models");

const bandMusicains = [
  {
    bandName: "The Falling Box",
    musicians: [
      { firstName: "Adam" , lastName: "Appleby"},
      { firstName: "Anton", lastName: "Martinovic"},
      { firstName: "Wilson",lastName: "Holt"}
    ]
  },
  {
    bandName: "America The Piano",
    musicians: [
      { firstName: "Marine", lastName: "Sweet"},
      { firstName: "Georgette", lastName: "Kubo"},
    ]
  },
  {
    bandName: "Loved Autumn",
    musicians: [
      { firstName: "Aurora", lastName: "Hase"}
    ]
  },
  {
    bandName: "Playin Sound",
    musicians: [
      { firstName: "Trenton", lastName: "lesley"},
      { firstName: "Camila" , lastName: "Nenci"}
    ]
  },
  {
    bandName: "The King River",
    musicians: [
      { firstName: "Rosamarie", lastName: "Affini"},
      { firstName: "Victoria", lastName: "Cremonesi"}
    ]
  }

]
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    for( let bandIdx = 0; bandIdx < bandMusicains.length; bandIdx++) {
      const {bandName, musicians} = bandMusicains[bandIdx]
      const band = await Band.findOne({ where: { name: bandName}})
      for( let musicianIdx = 0; musicianIdx < musicians.length; musicianIdx++) {
        const musician = musicians[musicianIdx];
        await band.createMusician({...musician})
      }   
       }

  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    for (let bandIdx = 0; bandIdx < bandMusicains.length; bandIdx++) {
      const { bandName, musicians } = bandMusicains[bandIdx]
      const band = await Band.findOne({ where: { name: bandName } })
      for (let musicianIdx = 0; musicianIdx < musicians.length; musicianIdx++) {
        const musician = musicians[musicianIdx];
        await Musician.destroy({ where: { ...musician, bandId: band.id } })
      }
    }
  }
};
