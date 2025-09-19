/**
 * XCC Techie character sheet overrides
 */

import DCCActorSheet from '/systems/dcc/module/actor-sheet.js'

/**
 * Extend the DCC actor sheet for XCC Techie
 * @extends {DCCActorSheet}
 */
class ActorSheetTechie extends DCCActorSheet {
    /** @inheritDoc */
    static DEFAULT_OPTIONS = {
        classes: ['dcc', 'sheet', 'actor', 'pc', 'techie'],
        position: {
            height: 635,
            width: 595
        }
    }

    /** @inheritDoc */
    static CLASS_TABS = {
        sheet: {
            tabs: [
                { id: 'techie', group: 'sheet', label: 'XCC.Techie' },
                { id: 'skills', group: 'sheet', label: 'DCC.Skills' }
            ],
            initial: 'character'
        }
    }

    /** @inheritDoc */
    static PARTS = {
        tabs: {
            template: 'systems/dcc/templates/actor-partial-tabs.html'
        },
        character: {
            template: 'systems/dcc/templates/actor-partial-pc-common.html'
        },
        equipment: {
            template: 'systems/dcc/templates/actor-partial-pc-equipment.html'
        },
        techie: {
            template: 'modules/xcc-classes/templates/actor-partial-techie.html'
        },
        skills: {
            template: 'systems/dcc/templates/actor-partial-skills.html'
        },
        notes: {
            template: 'systems/dcc/templates/actor-partial-pc-notes.html'
        }
    }

    /** @override */
    async _prepareContext(options) {
        const context = await super._prepareContext(options)
        
        if (context.system.details.sheetClass !== 'Techie') {
            this.actor.update({
                'system.class.className': game.i18n.localize('XCC.Techie'),
                'system.config.showSkills': true
            })
        }

        // Add XCC specific data if missing - Mojo
        if (!context.system.resources.mojo) {
            this.actor.update({
                'system.resources.mojo': {
                    label: 'XCC.Mojo',
                    value: 0,
                    max: 0
                }
            })
        }

        // Add Fame tracking
        if (!context.system.class.fame) {
            this.actor.update({
                'system.class.fame': {
                    label: 'XCC.Fame',
                    value: 0,
                    max: 100
                }
            })
        }

        return context
    }
}

export {
    ActorSheetTechie
}