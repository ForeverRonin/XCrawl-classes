/**
 * XCC Mystic character sheet overrides
 */

import DCCActorSheet from '/systems/dcc/module/actor-sheet.js'

/**
 * Extend the DCC actor sheet for XCC Mystic
 * @extends {DCCActorSheet}
 */
class ActorSheetMystic extends DCCActorSheet {
    /** @inheritDoc */
    static DEFAULT_OPTIONS = {
        classes: ['dcc', 'sheet', 'actor', 'pc', 'mystic'],
        position: {
            height: 635,
            width: 595
        }
    }

    /** @inheritDoc */
    static CLASS_TABS = {
        sheet: {
            tabs: [
                { id: 'mystic', group: 'sheet', label: 'XCC.Mystic' },
                { id: 'spells', group: 'sheet', label: 'DCC.Spells' },
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
        mystic: {
            template: 'modules/xcc-classes/templates/actor-partial-mystic.html'
        },
        spells: {
            template: 'systems/dcc/templates/actor-partial-pc-spells.html'
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
        
        if (context.system.details.sheetClass !== 'Mystic') {
            this.actor.update({
                'system.class.className': game.i18n.localize('XCC.Mystic'),
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

        // Set spell check ability for Mystic
        if (!context.system.class.spellCheckAbility) {
            this.actor.update({
                'system.class.spellCheckAbility': {
                    label: 'Mystic.spellCheckAbility',
                    value: 'Per'
                }
            })
        }

        return context
    }
}

export {
    ActorSheetMystic
}