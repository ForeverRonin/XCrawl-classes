/**
 * XCC Hacker character sheet overrides
 */

import DCCActorSheet from '/systems/dcc/module/actor-sheet.js'

/**
 * Extend the DCC actor sheet for XCC Hacker
 * @extends {DCCActorSheet}
 */
class ActorSheetHacker extends DCCActorSheet {
    /** @inheritDoc */
    static DEFAULT_OPTIONS = {
        classes: ['dcc', 'sheet', 'actor', 'pc', 'hacker'],
        position: {
            height: 635,
            width: 595
        }
    }

    /** @inheritDoc */
    static CLASS_TABS = {
        sheet: {
            tabs: [
                { id: 'hacker', group: 'sheet', label: 'XCC.Hacker' },
                { id: 'spells', group: 'sheet', label: 'XCC.Programs' },
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
        hacker: {
            template: 'modules/xcc-classes/templates/actor-partial-hacker.html'
        },
        spells: {
            template: 'modules/xcc-classes/templates/actor-partial-programs.html'
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
        
        if (context.system.details.sheetClass !== 'Hacker') {
            this.actor.update({
                'system.class.className': game.i18n.localize('XCC.Hacker'),
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

        // Add Hacker specific data if missing
        if (!context.system.skills.hackingCheck) {
            this.actor.update({
                'system.skills.hackingCheck': {
                    label: 'Hacker.HackingCheck',
                    value: '+0'
                }
            })
        }

        if (!context.system.skills.systemKnowledge) {
            this.actor.update({
                'system.skills.systemKnowledge': {
                    label: 'Hacker.SystemKnowledge',
                    value: '+0'
                }
            })
        }

        if (!context.system.class.spellCheckAbility) {
            this.actor.update({
                'system.class.spellCheckAbility': {
                    label: 'Hacker.spellCheckAbility',
                    value: 'Int'
                }
            })
        }

        return context
    }
}

export {
    ActorSheetHacker
}