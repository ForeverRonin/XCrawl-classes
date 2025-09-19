/* global foundry */

import * as HackerSheets from './actor-sheets-hacker.js';
import * as MysticSheets from './actor-sheets-mystic.js';
import * as ScoutSheets from './actor-sheets-scout.js';
import * as TechieSheets from './actor-sheets-techie.js';
import * as WarriorSheets from './actor-sheets-warrior.js';

const { Actors } = foundry.documents.collections
const { loadTemplates } = foundry.applications.handlebars

/* -------------------------------------------- */
/*  Foundry VTT Initialization                  */
/* -------------------------------------------- */

Hooks.once('init', async function () {
    console.log(`XCC | Initializing X-Crawl Classics System`)

    // Register sheet application classes
    Actors.registerSheet('xcc-hacker', HackerSheets.ActorSheetHacker, {
        types: ['Player'],
        label: 'Hacker.ActorSheetHacker'
    })
    Actors.registerSheet('xcc-mystic', MysticSheets.ActorSheetMystic, {
        types: ['Player'],
        label: 'Mystic.ActorSheetMystic'
    })
    Actors.registerSheet('xcc-scout', ScoutSheets.ActorSheetScout, {
        types: ['Player'], 
        label: 'Scout.ActorSheetScout'
    })
    Actors.registerSheet('xcc-techie', TechieSheets.ActorSheetTechie, {
        types: ['Player'],
        label: 'Techie.ActorSheetTechie'
    })
    Actors.registerSheet('xcc-warrior', WarriorSheets.ActorSheetWarrior, {
        types: ['Player'],
        label: 'Warrior.ActorSheetWarrior'
    })

    // Register shared templates for XCC characters
    const templatePaths = [
        'modules/xcc-classes/templates/actor-partial-programs.html'
    ]
    loadTemplates(templatePaths)
})