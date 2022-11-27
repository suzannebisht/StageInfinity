//=============================================================================
// VisuStella MZ - Battle System BTB - Brave Turn Battle
// VisuMZ_2_BattleSystemBTB.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_2_BattleSystemBTB = true;

var VisuMZ = VisuMZ || {};
VisuMZ.BattleSystemBTB = VisuMZ.BattleSystemBTB || {};
VisuMZ.BattleSystemBTB.version = 1.13;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 2] [Version 1.13] [BattleSystemBTB]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Battle_System_-_BTB_VisuStella_MZ
 * @base VisuMZ_0_CoreEngine
 * @base VisuMZ_1_BattleCore
 * @base VisuMZ_1_ItemsEquipsCore
 * @base VisuMZ_1_SkillsStatesCore
 * @orderAfter VisuMZ_1_BattleCore
 * @orderAfter VisuMZ_1_ItemsEquipsCore
 * @orderAfter VisuMZ_1_SkillsStatesCore
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * The Brave Turn Battle (BTB) system plays off RPG Maker MZ's default battle
 * system with a twist of allowing actors (and enemies) to use up actions from
 * the future or save up for later. These actions will be queued and delivered
 * all in one go! Any borrowed actions from the future will result in following
 * turns without any actions to use. Should a player decide to save up their
 * actions instead through Guarding, they can charge actions with less
 * repercussions. Players will have to be brave about how to go about the
 * battle system strategically.
 * 
 * Because multiple actions can be queued up all at once, they can result in
 * the creation of an action fusion. Some skills (and items) can appear instead
 * of the originally queued actions to result in stronger, better, and more
 * awesome effects, all of which, can be defined by the game dev.
 * 
 * A Turn Order Display will also appear on the screen to show the order the
 * battlers will take their turns in. This lets the player plan in advance on
 * how to go about the rest of the turn.
 * 
 * *NOTE* To use this battle system, you will need the updated version of
 * VisuStella's Core Engine. Go into its Plugin Parameters and change the
 * "Battle System" plugin parameter to "btb".
 *
 * Features include all (but not limited to) the following:
 * 
 * * Puts a twist on the Default Turn Battle system by allowing brave players
 *   to borrow actions from the future turns or save them up for later turns.
 * * Brave Points, a new currency, are added to mark how many saved turns there
 *   are for each battler.
 * * Certain actions can cost more Brave Points than others.
 * * Effects that allow battlers to alter the Brave Points of their targets.
 * * A Turn Order Display to show the player when each battler will have its
 *   turn to perform an action.
 * * Action fusion system which takes any of the queued up skills and/or items
 *   to bring forth new ones.
 * * Action fusion combinations can be either flexible or strict.
 * * Flexible action fusion combinations can have their actions queued up in
 *   any order to bring forth the result.
 * * Strict action fusion combinations must require their actions to be queued
 *   up in a specific order in order to bring forth the result.
 *
 * ============================================================================
 * Requirements
 * ============================================================================
 *
 * This plugin is made for RPG Maker MZ. This will not work in other iterations
 * of RPG Maker.
 *
 * ------ Required Plugin List ------
 *
 * * VisuMZ_0_CoreEngine
 * * VisuMZ_1_BattleCore
 * * VisuMZ_1_ItemsEquipsCore
 * * VisuMZ_1_SkillsStatesCore
 *
 * This plugin requires the above listed plugins to be installed inside your
 * game's Plugin Manager list in order to work. You cannot start your game with
 * this plugin enabled without the listed plugins.
 *
 * ------ Tier 2 ------
 *
 * This plugin is a Tier 2 plugin. Place it under other plugins of lower tier
 * value on your Plugin Manager list (ie: 0, 1, 2, 3, 4, 5). This is to ensure
 * that your plugins will have the best compatibility with the rest of the
 * VisuStella MZ library.
 *
 * ============================================================================
 * Major Changes
 * ============================================================================
 *
 * This plugin adds some new hard-coded features to RPG Maker MZ's functions.
 * The following is a list of them.
 *
 * ---
 * 
 * Turn Order Display
 * 
 * The Turn Order Display will capture the battle's currently active battler
 * and any battlers found in the active battlers array for the BattleManager.
 * This does not overwrite any functions, but the Turn Order Display may or may
 * not conflict with any existing HUD elements that are already positioned on
 * the screen. If so, you can choose to offset the Turn Order Display or move
 * it to a different part of the screen through the plugin parameters.
 * 
 * ---
 * 
 * Brave Points and the Brave Command
 * 
 * Abbreviated to "BP", Brave Points are a new currency available through the
 * Brave Turn Battle system. Battlers require at least 0 BP in order to perform
 * any actions for that turn. By default, each action consumes 1 BP. At the end
 * of each turn, each battler regenerates 1 BP. With the normal flow of battle,
 * this results in a net balance.
 * 
 * However, the player can activate the "Brave Command" located right above the
 * Guard Command. This lets the battler create an extra action to perform. When
 * used, the flow of battle will result in a negative net of BP. When BP is at
 * -1 or under, that battler's turn is skipped until it raises back to 0. This
 * effectively means that the "Brave Command" will borrow actions from future
 * turns.
 * 
 * The Guard Command, however will never consume any BP for its actions even if
 * replaced as it is always determined by the battler's current guard skill.
 * This means that when used, the Guard Command lets a battler save up BP for
 * future turns, allowing BP to go net positive for the turn.
 * 
 * By strategically deciding when to borrow actions or save up for them, whole
 * new strategies can be created for battle.
 * 
 * The game dev has control over how many max actions can be borrowed at once,
 * the maximum and minimum amounts for BP to go to, how much BP will cost at
 * default, and how much BP can be regenerated by default. These settings can
 * all be made within the Plugin Parameters.
 * 
 * ---
 *
 * Action Times +
 * 
 * While the Brave Turn Battle system is active, the "Action Times +" trait
 * is disabled. This is to prevent any conflicts with the Brave system. If the
 * Brave Turn Battle system is disabled during the course of the game, then the
 * "Action Times +" will resume working like normal.
 *
 * ---
 * 
 * Can Input
 * 
 * As mentioned in the "Brave Points and the Brave Command" above, if BP is
 * under 0, then that battler cannot input or act for that turn. The battler
 * would have to wait for BP regenerate back up to 0 first.
 * 
 * ---
 * 
 * Can Guard
 * 
 * The Guard action is only enabled when there's one action to use for that
 * turn. This means that if the "Brave Command" is used to generate new actions
 * to perform during that turn, the Guard Command will be disabled. It can be
 * enabled once again if the player cancels out the Brave Command until the
 * action count reaches 1.
 * 
 * ---
 * 
 * Enemy Brave Actions
 * 
 * Enemies can also use the "Brave Command" by faking it. By making a dummy
 * skill with the <BTB Multiple Actions: id, id, id, id> skill notetag or the
 * <BTB Multiple Actions: name, name, name, name> skill notetag, you can have
 * the enemy perform the exact skills you want in a multi-action queue.
 * 
 * Enemies that use this will also suffer from heavy BP expenditure and wait on
 * subsequent turns until they have enough BP to perform actions again.
 * 
 * This is also how you can have enemies perform Action Fusions. For the queued
 * skills, load up the Action Fusion's skill combination you want for the enemy
 * to perform.
 * 
 * ---
 *
 * ============================================================================
 * Action Fusions
 * ============================================================================
 *
 * This feature deserves its own section as it's quite indepth with how it
 * works. Action Fusions can be performed by either the actor and/or enemy
 * (though this can be disabled in the Plugin Parameters or through traits).
 * In order for them to occur, the queued up action list must have a certain
 * combination of skills/items for the Action Fusion to occur.
 *
 * ---
 * 
 * Fusion Types
 * 
 * There are two types of Action Fusions: Flexible and Strict. Flexible Action
 * Fusions can use a combination of skills/items in any order (thus flexible),
 * while Strict Action Fusions must have their skill/item combinations queued
 * up in the exact order they're listed (thus strict).
 * 
 * They all share the following properties:
 * 
 * Skill Action Fusions can only use skills for combinations. This means that
 * Action Fusions made as a skill database object cannot have item requirements
 * for the combinations.
 * 
 * Item Action Fusions can only use items for combinations. This means that
 * Action Fusions made as an item database object cannot have skills for the
 * combination requirements.
 * 
 * Skills and items that have selectable targets need to have matching targets
 * to be a part of the same Action Fusion combination. For example, if "Quad
 * Attack" requires "Attack", "Attack", "Attack", "Attack", then the player
 * would have to target the same enemy for each of the "Attack" actions. This
 * is to prevent the cases where the player wants to spread out the damage
 * evenly across various enemies without forming it into a single target "Quad
 * Attack" against one.
 * 
 * Skills and items that do not have selectable targets are combination targets
 * for any and all candidates. This means an area of effect "Flame" spell can
 * combine with any target selectable or otherwise skill.
 * 
 * When an Action Fusion is performed, it will not consume the resources for
 * the database object itself, but instead, from each of the skills/items used
 * to bring it out. This means the skill costs of the Action Fusion itself are
 * irrelevant, but the skill costs of the combinations do matter and will be
 * consumed instead. The same applies to items.
 * 
 * If the Action Fusion skill/item is used directly, its resource consumption
 * will be performed as if it was not an Action Fusion skill/item. The "Quad
 * Attack" skill will use its regular MP and TP costs while the "Double Elixir"
 * item will consume itself.
 * 
 * If a queue could potentially meet the demands of multiple Action Fusions,
 * then the Action Fusion with the highest database ID will be given priority,
 * as to make it less complicated. This means if the "Double Attack" Action
 * Fusion and "Triple Attack" Action Fusion were to occur at the same time,
 * if the "Triple Attack" skill has a higher ID than "Double Attack", then
 * "Triple Attack" will take priority instead.
 * 
 * The battler must be able to pay the actions of each of the queued actions
 * used to form the Action Fusion. This means if a battler would run out of MP
 * or items for the cost, it will just simply not occur.
 * 
 * An Action Fusion can have multiple combinations that create it as long as
 * there are multiple notetags that determine the Action Fusion. As an example,
 * the "Flame Strike" can occur with the "Attack" and "Flame" combination or
 * the "Strike" and "Flame" combination.
 * 
 * ---
 *
 * Flexible Action Fusion
 *
 * <BTB Flexible Fusion: id, id>
 * <BTB Flexible Fusion: id, id, id>
 * <BTB Flexible Fusion: id, id, id, id>
 *
 * <BTB Flexible Fusion: name, name>
 * <BTB Flexible Fusion: name, name, name>
 * <BTB Flexible Fusion: name, name, name, name>
 *
 * - Used for: Skill, Item Notetags
 * - This Action Fusion skill/item will occur as long as any of the listed
 *   combination skills/items are queued in the action list for that turn.
 *   These actions can be queued in any order.
 * - Replace 'id' with the database ID of the skill/item to use as a
 *   combination requirement.
 * - Replace 'name' with the name of the skill/item to use as a combination
 *   requirement.
 * - Skill Action Fusions can only use skills for combinations.
 * - Item Action Fusions can only use items for combinations.
 * - Skills and items that have selectable targets need to have matching
 *   targets to be a part of the same Action Fusion combination.
 * - Skills and items that do not have selectable targets are combination
 *   targets for any and all candidates.
 * - When an Action Fusion is performed, it will not consume the resources for
 *   the database object itself, but instead, from each of the skills/items
 *   used to bring it out.
 * - Is used directly, this action's resource consumption will be performed as
 *   if it was not an Action Fusion skill/item.
 * - If a queue could potentially meet the demands of multiple Action Fusions,
 *   then the Action Fusion with the highest database ID is given priority.
 * - The battler must be able to pay the actions of each of the queued actions
 *   used to form the Action Fusion.
 * - Insert multiple copies of this notetag to give this Action Fusion more
 *   combinations that can activate it.
 * 
 * Examples:
 * 
 *   ---
 * 
 *   Fire Strike
 * 
 *   <BTB Flexible Fusion: Attack, Fire>
 * 
 *   This Action Fusion will occur if a battler has the "Attack" and "Fire"
 *   actions queued up in any order. "Attack" can come before "Fire" or "Fire"
 *   can come before "Attack" and it would still call upon "Fire Strike".
 * 
 *   ---
 * 
 *   Flame Strike
 * 
 *   <BTB Flexible Fusion: Attack, Flame>
 *   <BTB Flexible Fusion: Strike, Flame>
 * 
 *   This Action Fusion will occur if a battler has "Attack" and "Flame",
 *   "Flame" and "Attack", "Strike" and "Flame", or "Flame" and "Strike" in its
 *   action queue.
 * 
 *   ---
 *
 * ---
 * 
 * Strict Action Fusion
 *
 * <BTB Strict Fusion: id, id>
 * <BTB Strict Fusion: id, id, id>
 * <BTB Strict Fusion: id, id, id, id>
 *
 * <BTB Strict Fusion: name, name>
 * <BTB Strict Fusion: name, name, name>
 * <BTB Strict Fusion: name, name, name, name>
 *
 * - Used for: Skill, Item Notetags
 * - This Action Fusion skill/item will occur as long as the exact listed
 *   combination(s) of skills/items is queued in the action list for that turn.
 *   These actions can be queued in any order.
 * - Replace 'id' with the database ID of the skill/item to use as a
 *   combination requirement.
 * - Replace 'name' with the name of the skill/item to use as a combination
 *   requirement.
 * - Skill Action Fusions can only use skills for combinations.
 * - Item Action Fusions can only use items for combinations.
 * - Skills and items that have selectable targets need to have matching
 *   targets to be a part of the same Action Fusion combination.
 * - Skills and items that do not have selectable targets are combination
 *   targets for any and all candidates.
 * - When an Action Fusion is performed, it will not consume the resources for
 *   the database object itself, but instead, from each of the skills/items
 *   used to bring it out.
 * - Is used directly, this action's resource consumption will be performed as
 *   if it was not an Action Fusion skill/item.
 * - If a queue could potentially meet the demands of multiple Action Fusions,
 *   then the Action Fusion with the highest database ID is given priority.
 * - The battler must be able to pay the actions of each of the queued actions
 *   used to form the Action Fusion.
 * - Insert multiple copies of this notetag to give this Action Fusion more
 *   combinations that can activate it.
 * 
 * Example:
 * 
 *   ---
 * 
 *   Shadow Flare Blade
 * 
 *   <BTB Strict Fusion: Shade II, Fire II, Attack>
 * 
 *   The battler must queue up "Shade II", "Fire II", and "Attack" in that
 *   exact order or else "Shadow Flare Blade" will not occur. Even if the
 *   battler changed the order to "Fire II", "Shade II", and "Attack", the
 *   Action Fusion will not occur.
 * 
 *   ---
 * 
 * ---
 *
 * ============================================================================
 * VisuStella MZ Compatibility
 * ============================================================================
 *
 * While this plugin is compatible with the majority of the VisuStella MZ
 * plugin library, it is not compatible with specific plugins or specific
 * features. This section will highlight the main plugins/features that will
 * not be compatible with this plugin or put focus on how the make certain
 * features compatible.
 *
 * ---
 *
 * VisuMZ_3_BoostAction
 * 
 * The Boost Actions plugin cannot be used together with Battle System - BTB.
 * If the Battle System is switched to using Battle System - BTB, then the
 * Boost Actions plugin will shut itself off.
 * 
 * The reason why these plugins cannot work together is because their mechanics
 * play off too similarly to each other and cause conflicts. We, the plugin
 * developer team, highly recommend that you utilize Battle System - BTB's
 * Brave system instead of the Boost system to make the best use of the battle
 * system in effect.
 *
 * ---
 *
 * ============================================================================
 * Notetags
 * ============================================================================
 *
 * The following are notetags that have been added through this plugin. These
 * notetags will not work with your game if this plugin is OFF or not present.
 *
 * ---
 * 
 * === General BTB-Related Notetags ===
 * 
 * These notetags are general purpose notetags that have became available
 * through this plugin.
 * 
 * ---
 * 
 * <BTB Help>
 *  description
 *  description
 * </BTB Help>
 *
 * - Used for: Skill, Item Notetags
 * - If your game happens to support the ability to change battle systems, this
 *   notetag lets you change how the skill/item's help description text will
 *   look under BTB.
 * - This is primarily used if the skill behaves differently in BTB versus any
 *   other battle system.
 * - Replace 'description' with help text that's only displayed if the game's
 *   battle system is set to BTB.
 *
 * ---
 *
 * <BTB Cannot Brave>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - If a battler is affected by a trait object with one of these notetags,
 *   that battler cannot use Brave to generate more actions.
 * - For actors, this will come with the Brave Command disabled.
 *
 * ---
 *
 * <BTB Hide Brave>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - If a battler is affected by a trait object with one of these notetags,
 *   that battler cannot use Brave to generate more actions.
 * - For actors, this will come with the Brave Command hidden along with their
 *   BP values.
 *
 * ---
 * 
 * === BTB Turn Order Display-Related Notetags ===
 * 
 * These notetags affect the BTB Turn Order Display
 * 
 * ---
 *
 * <BTB Turn Order Icon: x>
 *
 * - Used for: Actor, Enemy Notetags
 * - Changes the slot graphic used for the battler to a specific icon.
 * - Replace 'x' with the icon index to be used.
 * 
 * ---
 *
 * <BTB Turn Order Face: filename, index>
 *
 * - Used for: Actor, Enemy Notetags
 * - Changes the slot graphic used for the enemy to a specific face.
 * - Replace 'filename' with the filename of the image.
 *   - Do not include the file extension.
 * - Replace 'index' with the index of the face. Index values start at 0.
 * - Example: <BTB Turn Order Face: Monster, 1>
 * 
 * ---
 * 
 * === Brave Points Cost-Related Notetags ===
 * 
 * The following notetags are used to manage Brave Point (BP) costs, how some
 * actions can alter other BP values, and more.
 * 
 * ---
 *
 * <BTB BP Cost: x>
 *
 * - Used for: Skill, Item Notetags
 * - Determines how much BP the battler uses when performing this action.
 * - Replace 'x' with a number value to determine its BP cost.
 *
 * ---
 *
 * <BTB Hide BP Cost>
 *
 * - Used for: Skill, Item Notetags
 * - Prevents the BP cost from being shown for this action.
 *
 * ---
 * 
 * === Brave Point Manipulation-Related Notetags ===
 * 
 * The following notetags are used to manage Brave Point (BP) costs, how some
 * actions can alter other BP values, and more.
 * 
 * ---
 *
 * <BTB User Set BP: x>
 * <BTB Target Set BP: x>
 *
 * - Used for: Skill, Item Notetags
 * - Sets the user/target's current BP to a specific value.
 * - Replace 'x' with a number value to determine how much you want the user
 *   or target's BP to be set to.
 * - The 'user' variant only affects the action's user.
 * - The 'target' variant only affects the action's target.
 *
 * ---
 *
 * <BTB User Gain BP: +x>
 * <BTB Target Gain BP: +x>
 *
 * <BTB User Lose BP: -x>
 * <BTB Target Lose BP: -x>
 *
 * - Used for: Skill, Item Notetags
 * - Causes the action to alter how much BP the user/target has.
 * - Replace 'x' with a number value to determine how much BP is gained/lost
 *   for the user/target.
 * - The 'user' variant only affects the action's user.
 * - The 'target' variant only affects the action's target.
 *
 * ---
 * 
 * === JavaScript Notetags: Brave Point Manipulation ===
 *
 * The following are notetags made for users with JavaScript knowledge to
 * give more control over Brave Point alteration.
 * 
 * ---
 *
 * <JS BTB User BP>
 *  code
 *  code
 *  value = code;
 * </JS BTB User BP>
 *
 * - Used for: Skill, Item Notetags
 * - Replace 'code' with JavaScript code to determine what is the user's final
 *   BP value after all of the code is ran.
 * - The 'value' variable is the returned value to be set as the user's BP.
 *   This value also starts off as the user's current BP.
 * - The 'user' variable refers to the action's user.
 * - The 'target' variable refers to the action's current target.
 * 
 * ---
 *
 * <JS BTB Target BP>
 *  code
 *  code
 *  value = code;
 * </JS BTB Target BP>
 *
 * - Used for: Skill, Item Notetags
 * - Replace 'code' with JavaScript code to determine what is the current
 *   target's final BP value after all of the code is ran.
 * - The 'value' variable is the returned value to be set as the target's BP.
 *   This value also starts off as the target's current BP.
 * - The 'user' variable refers to the action's user.
 * - The 'target' variable refers to the action's current target.
 * 
 * ---
 * 
 * === Brave Point Managment-Related Notetags ===
 * 
 * The following notetags are used to for battlers to manage their BP settings
 * throughout the course of the fight.
 * 
 * ---
 *
 * <BTB Initial BP: +x>
 * <BTB Initial BP: -x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - If a battler is affected by a trait object with one of these notetags,
 *   alter that battler's initial BP at the start of battle.
 * - Replace 'x' with a number value representing how much you want to alter
 *   the affected battler's initial BP at the start of battle.
 *
 * ---
 *
 * <BTB BP Regen: +x>
 * <BTB BP Degen: -x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - If a battler is affected by a trait object with one of these notetags,
 *   alter the amount of BP regenerated at the end of each battle turn.
 * - Replace 'x' with a number value representing how much BP is regenerated
 *   (or decreased). 
 *   - Use a positive number for gaining BP at the end of each turn.
 *   - Use a negative number for losing BP at the end of each turn.
 *
 * ---
 *
 * <BTB Maximum BP: +x>
 * <BTB Maximum BP: -x>
 *
 * <BTB Minimum BP: +x>
 * <BTB Minimum BP: -x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - If a battler is affected by a trait object with one of these notetags,
 *   increase or decrease the maximum/minimum BP that battler can have by 'x'.
 * - Replace 'x' with a number value representing the amount to change the
 *   battler's maximum/minimum BP by.
 * - These numbers cannot exceed or go under the designated amounts set by the
 *   hard cap in this plugin's Plugin Parameters.
 *
 * ---
 * 
 * === Multiple Action-Related Notetags ===
 * 
 * These notetags allow you to determine how multiple actions are handled
 * through the Brave Turn Battle system.
 * 
 * ---
 *
 * <BTB Maximum Actions: +x>
 * <BTB Maximum Actions: -x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - If a battler is affected by a trait object with one of these notetags,
 *   increase/decrease the maximum number of actions that battler can have
 *   through the Brave Command.
 * - Replace 'x' with a number value representing the amount of maximum actions
 *   to increase/decrease by.
 * - This value cannot make a battler go below 1 maximum action.
 * - This value cannot make a battler go above the hard cap set in this
 *   plugin's Plugin Parameters.
 *
 * ---
 *
 * <BTB Multiple Actions: id, id>
 * <BTB Multiple Actions: id, id, id>
 * <BTB Multiple Actions: id, id, id, id>
 *
 * <BTB Multiple Actions: name, name>
 * <BTB Multiple Actions: name, name, name>
 * <BTB Multiple Actions: name, name, name, name>
 *
 * - Used for: Skill Notetags
 * - When an enemy (NOT ACTOR) uses this skill, the game will appear as if the
 *   enemy is using the Brave Command to load up multiple actions at a time.
 * - Replace 'id' with the database ID of the skill to use in the multiple
 *   action queue.
 * - Replace 'name' with the name of the skill to use in the enemy's multiple
 *   action queue.
 * 
 * ---
 * 
 * === Action Fusion-Related Notetags ===
 * 
 * For more details, please refer to the Action Fusion dedicated section listed
 * earlier in the documentation.
 * 
 * ---
 *
 * Flexible Action Fusion
 *
 * <BTB Flexible Fusion: id, id>
 * <BTB Flexible Fusion: id, id, id>
 * <BTB Flexible Fusion: id, id, id, id>
 *
 * <BTB Flexible Fusion: name, name>
 * <BTB Flexible Fusion: name, name, name>
 * <BTB Flexible Fusion: name, name, name, name>
 *
 * - Used for: Skill, Item Notetags
 * - This Action Fusion skill/item will occur as long as any of the listed
 *   combination skills/items are queued in the action list for that turn.
 *   These actions can be queued in any order.
 * - Replace 'id' with the database ID of the skill/item to use as a
 *   combination requirement.
 * - Replace 'name' with the name of the skill/item to use as a combination
 *   requirement.
 * - Skill Action Fusions can only use skills for combinations.
 * - Item Action Fusions can only use items for combinations.
 * - Skills and items that have selectable targets need to have matching
 *   targets to be a part of the same Action Fusion combination.
 * - Skills and items that do not have selectable targets are combination
 *   targets for any and all candidates.
 * - When an Action Fusion is performed, it will not consume the resources for
 *   the database object itself, but instead, from each of the skills/items
 *   used to bring it out.
 * - Is used directly, this action's resource consumption will be performed as
 *   if it was not an Action Fusion skill/item.
 * - If a queue could potentially meet the demands of multiple Action Fusions,
 *   then the Action Fusion with the highest database ID is given priority.
 * - The battler must be able to pay the actions of each of the queued actions
 *   used to form the Action Fusion.
 * - Insert multiple copies of this notetag to give this Action Fusion more
 *   combinations that can activate it.
 *
 * ---
 * 
 * Strict Action Fusion
 *
 * <BTB Strict Fusion: id, id>
 * <BTB Strict Fusion: id, id, id>
 * <BTB Strict Fusion: id, id, id, id>
 *
 * <BTB Strict Fusion: name, name>
 * <BTB Strict Fusion: name, name, name>
 * <BTB Strict Fusion: name, name, name, name>
 *
 * - Used for: Skill, Item Notetags
 * - This Action Fusion skill/item will occur as long as the exact listed
 *   combination(s) of skills/items is queued in the action list for that turn.
 *   These actions can be queued in any order.
 * - Replace 'id' with the database ID of the skill/item to use as a
 *   combination requirement.
 * - Replace 'name' with the name of the skill/item to use as a combination
 *   requirement.
 * - Skill Action Fusions can only use skills for combinations.
 * - Item Action Fusions can only use items for combinations.
 * - Skills and items that have selectable targets need to have matching
 *   targets to be a part of the same Action Fusion combination.
 * - Skills and items that do not have selectable targets are combination
 *   targets for any and all candidates.
 * - When an Action Fusion is performed, it will not consume the resources for
 *   the database object itself, but instead, from each of the skills/items
 *   used to bring it out.
 * - Is used directly, this action's resource consumption will be performed as
 *   if it was not an Action Fusion skill/item.
 * - If a queue could potentially meet the demands of multiple Action Fusions,
 *   then the Action Fusion with the highest database ID is given priority.
 * - The battler must be able to pay the actions of each of the queued actions
 *   used to form the Action Fusion.
 * - Insert multiple copies of this notetag to give this Action Fusion more
 *   combinations that can activate it.
 *
 * ---
 *
 * <BTB Cannot Fusion>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - If a battler is affected by a trait object that has this notetag, that
 *   battler cannot perform any Action Fusions. Queued skills will occur
 *   normally instead.
 * - If the actor is affected by both notetags for <BTB Cannot Fusion> and
 *   <BTB Enable Fusion> priority will be given based on the order of their
 *   trait objects.
 *
 * ---
 *
 * <BTB Enable Fusion>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - If a battler is affected by a trait object that has this notetag, that
 *   battler is allowed to perform any Action Fusions. Queued skills will occur
 *   normally instead.
 * - If the actor is affected by both notetags for <BTB Cannot Fusion> and
 *   <BTB Enable Fusion> priority will be given based on the order of their
 *   trait objects.
 *
 * ---
 *
 * ============================================================================
 * Plugin Commands
 * ============================================================================
 *
 * The following are Plugin Commands that come with this plugin. They can be
 * accessed through the Plugin Command event command.
 *
 * ---
 * 
 * === Actor Plugin Commands ===
 * 
 * ---
 *
 * Actor: Change BTB Turn Order Icon
 * - Changes the icons used for the specific actor(s) on the BTB Turn Order.
 *
 *   Actor ID(s):
 *   - Select which Actor ID(s) to affect.
 *
 *   Icon:
 *   - Changes the graphic to this icon.
 *
 * ---
 *
 * Actor: Change BTB Turn Order Face
 * - Changes the faces used for the specific actor(s) on the BTB Turn Order.
 *
 *   Actor ID(s):
 *   - Select which Actor ID(s) to affect.
 *
 *   Face Name:
 *   - This is the filename for the target face graphic.
 *
 *   Face Index:
 *   - This is the index for the target face graphic.
 *
 * ---
 *
 * Actor: Clear BTB Turn Order Graphic
 * - Clears the BTB Turn Order graphics for the actor(s).
 * - The settings will revert to the Plugin Parameter settings.
 *
 *   Actor ID(s):
 *   - Select which Actor ID(s) to affect.
 *
 * ---
 * 
 * === Enemy Plugin Commands ===
 * 
 * ---
 *
 * Enemy: Change BTB Turn Order Icon
 * - Changes the icons used for the specific enemy(ies) on the BTB Turn Order.
 *
 *   Enemy Index(es):
 *   - Select which enemy index(es) to affect.
 *
 *   Icon:
 *   - Changes the graphic to this icon.
 *
 * ---
 *
 * Enemy: Change BTB Turn Order Face
 * - Changes the faces used for the specific enemy(ies) on the BTB Turn Order.
 *
 *   Enemy Index(es):
 *   - Select which enemy index(es) to affect.
 *
 *   Face Name:
 *   - This is the filename for the target face graphic.
 *
 *   Face Index:
 *   - This is the index for the target face graphic.
 *
 * ---
 *
 * Enemy: Clear BTB Turn Order Graphic
 * - Clears the BTB Turn Order graphics for the enemy(ies).
 * - The settings will revert to the Plugin Parameter settings.
 *
 *   Enemy Index(es):
 *   - Select which enemy index(es) to affect.
 *
 * ---
 * 
 * === System Plugin Commands ===
 * 
 * ---
 *
 * System: BTB Turn Order Visibility
 * - Determine the visibility of the BTB Turn Order Display.
 *
 *   Visibility:
 *   - Changes the visibility of the BTB Turn Order Display.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: General Settings
 * ============================================================================
 *
 * General settings regarding Battle System BTB. These range from how Brave
 * Points (BP) appear in-game to how their costs are displayed.
 *
 * ---
 *
 * Brave Points
 * 
 *   Full Name:
 *   - What is the full name of "Brave Points" in your game?
 * 
 *   Abbreviation:
 *   - What is the abbreviation of "Brave Points" in your game?
 * 
 *   Icon:
 *   - What icon do you wish to use to represent Brave Points?
 * 
 *   Cost Format:
 *   - How are Brave Point costs displayed?
 *   - %1 - Cost, %2 - BP Text, %3 - Icon
 *
 * ---
 *
 * Displayed Costs
 * 
 *   Cost Position Front?:
 *   - Put the BP Cost at the front of skill/item costs?
 * 
 *   Show Cost: Attack:
 *   - Show the BP cost for the Attack command?
 * 
 *   Show Cost: Guard:
 *   - Show the BP cost for the Guard command?
 * 
 *   Reduce Shown BP Cost:
 *   - Reduce shown BP costs by this much.
 *   - Used to match traditional games.
 * 
 *   Show Cost: 0 BP:
 *   - Show the BP cost when the cost is 0 BP?
 *   - Shown BP Cost reduction is applied.
 * 
 *   Show Cost: 1 BP:
 *   - Show the BP cost when the cost is 1 BP?
 *   - Shown BP Cost reduction is applied.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Mechanics Settings
 * ============================================================================
 *
 * Adjust the mechanics settings for the Battle System BTB. Mechanics range
 * from how speed is handled to Brave action caps, how Brave Points are
 * managed, and Action Fusions.
 *
 * ---
 *
 * Action Speed
 * 
 *   Allow Random Speed?:
 *   - Allow speed to be randomized base off the user's AGI?
 * 
 *   JS: Calculate:
 *   - Code used to calculate action speed.
 *
 * ---
 *
 * Brave Action Max
 * 
 *   Default:
 *   - What is the default number of max actions a battler can have from the
 *     Brave system?
 * 
 *   Hard Cap:
 *   - What is the absolute highest for maximum actions a battler can have
 *     from the Brave system?
 *
 * ---
 *
 * Brave Points > Limits
 * 
 *   Default Maximum:
 *   - What is the default maximum number of Brave Points a battler can have at
 *     a time?
 * 
 *   Default Minimum:
 *   - What is the default minimum number of Brave Points a battler can have at
 *     a time?
 * 
 *   Hard Cap Maximum:
 *   - What is the absolute maximum number of Brave Points a battler can have
 *     at a time?
 * 
 *   Hard Cap Minimum:
 *   - What is the absolute minimum number of Brave Points a battler can have
 *     at a time?
 *
 * ---
 *
 * Brave Points > Costs
 * 
 *   Default Skill Cost:
 *   - How many Brave Points does a skill cost by default?
 * 
 *   Default Item Cost:
 *   - How many Brave Points does an item cost by default?
 * 
 *   Predicted Cost:
 *   - What is considered predicted cost?
 *
 * ---
 *
 * Brave Points > Start Battle
 * 
 *   Neutral:
 *   - How many Brave Points should a battler have if the battle advantage is
 *     neutral?
 * 
 *   Favored:
 *   - How many Brave Points should a battler have if the battle advantage is
 *     favored?
 *
 * ---
 *
 * Brave Points > Regeneration
 * 
 *   Base Recovery:
 *   - How many Brave Points are regenerated at the end of each turn?
 * 
 *   Needs to be Alive?:
 *   - Do battlers need to be alive to regenerate Brave Points?
 *
 * ---
 *
 * Action Fusions
 * 
 *   Actor Access?:
 *   - Allow actors access to Action Fusions?
 * 
 *   Enemy Access?:
 *   - Allow enemies access to Action Fusions?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Brave Animations Settings
 * ============================================================================
 *
 * Animation when applying/canceling Brave effects.
 *
 * ---
 *
 * On Brave
 * 
 *   Animation ID:
 *   - Play this animation when the effect activates.
 * 
 *   Mirror Animation:
 *   - Mirror the effect animation?
 * 
 *   Mute Animation:
 *   - Mute the effect animation?
 *
 * ---
 *
 * Cancel Brave
 * 
 *   Animation ID:
 *   - Play this animation when the effect activates.
 * 
 *   Mirror Animation:
 *   - Mirror the effect animation?
 * 
 *   Mute Animation:
 *   - Mute the effect animation?
 *
 * ---
 *
 * Enemy Brave
 * 
 *   Show Activation?:
 *   - Show the enemy activating Brave?
 * 
 *   Wait Frames:
 *   - This is the number of frames to wait between activations.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Turn Order Display Settings
 * ============================================================================
 *
 * Turn Order Display settings used for Battle System BTB. These adjust how the
 * visible turn order appears in-game.
 *
 * ---
 *
 * General
 * 
 *   Display Position:
 *   - Select where the Turn Order will appear on the screen.
 * 
 *     Offset X:
 *     - How much to offset the X coordinate by.
 *     - Negative: left. Positive: right.
 * 
 *     Offset Y:
 *     - How much to offset the Y coordinate by.
 *     - Negative: up. Positive: down.
 * 
 *   Center Horizontal?:
 *   - Reposition the Turn Order Display to always be centered if it is a
 *     'top' or 'bottom' position?
 * 
 *   Reposition for Help?:
 *   - If the display position is at the top, reposition the display when the
 *     help window is open?
 * 
 *   Reposition Log?:
 *   - If the display position is at the top, reposition the Battle Log Window
 *     to be lower?
 * 
 *   Forward Direction:
 *   - Decide on the direction of the Turn Order.
 *   - Settings may vary depending on position.
 *   - Left to Right / Down to Up
 *   - Right to Left / Up to Down
 * 
 *   Subject Distance:
 *   - How far do you want the currently active battler to distance itself from
 *     the rest of the Turn Order?
 * 
 *   Screen Buffer:
 *   - What distance do you want the display to be away from the edge of the
 *     screen by?
 *
 * ---
 *
 * Reposition For Help
 * 
 *   Repostion X By:
 *   Repostion Y By:
 *   - Reposition the display's coordinates by this much when the Help Window
 *     is visible.
 *
 * ---
 *
 * Slots
 * 
 *   Max Horizontal:
 *   - Maximum slots you want to display for top and bottom Turn Order Display
 *     positions?
 * 
 *   Max Vertical:
 *   - Maximum slots you want to display for left and right Turn Order Display
 *     positions?
 * 
 *   Length:
 *   - How many pixels long should the slots be on the Turn Order display?
 * 
 *   Thin:
 *   - How many pixels thin should the slots be on the Turn Order display?
 * 
 *   Update Frames:
 *   - How many frames should it take for the slots to update their
 *     positions by?
 *
 * ---
 *
 * Slot Border
 * 
 *   Show Border?:
 *   - Show borders for the slot sprites?
 * 
 *   Border Thickness:
 *   - How many pixels thick should the colored portion of the border be?
 * 
 *   Actors
 *   Enemies
 * 
 *     Border Color:
 *     - Use #rrggbb for custom colors or regular numbers for text colors
 *       from the Window Skin.
 * 
 *     Border Skin:
 *     - Optional. Place a skin on the actor/enemy borders instead of
 *       rendering them?
 *
 * ---
 *
 * Slot Sprites
 * 
 *   Actors
 * 
 *     Sprite Type:
 *     - Select the type of sprite used for the actor graphic.
 *     - Face Graphic - Show the actor's face.
 *     - Icon - Show a specified icon.
 *     - Sideview Actor - Show the actor's sideview battler.
 * 
 *     Default Icon:
 *     - Which icon do you want to use for actors by default?
 * 
 *   Enemies
 * 
 *     Sprite Type:
 *     - Select the type of sprite used for the enemy graphic.
 *     - Face Graphic - Show a specified face graphic.
 *     - Icon - Show a specified icon.
 *     - Enemy - Show the enemy's graphic or sideview battler.
 * 
 *     Default Face Name:
 *     - Use this default face graphic if there is no specified face.
 * 
 *     Default Face Index:
 *     - Use this default face index if there is no specified index.
 * 
 *     Default Icon:
 *     - Which icon do you want to use for enemies by default?
 * 
 *     Match Hue?:
 *     - Match the hue for enemy battlers?
 *     - Does not apply if there's a sideview battler.
 *
 * ---
 *
 * Slot Letter
 * 
 *   Show Enemy Letter?:
 *   - Show the enemy's letter on the slot sprite?
 * 
 *   Font Name:
 *   - The font name used for the text of the Letter.
 *   - Leave empty to use the default game's font.
 * 
 *   Font Size:
 *   - The font size used for the text of the Letter.
 *
 * ---
 *
 * Slot Background
 * 
 *   Show Background?:
 *   - Show the background on the slot sprite?
 * 
 *   Actors
 *   Enemies
 * 
 *     Background Color 1:
 *     Background Color 2:
 *     - Use #rrggbb for custom colors or regular numbers for text colors
 *       from the Window Skin.
 * 
 *     Background Skin:
 *     - Optional. Use a skin for the actor background instead of
 *       rendering them?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Window Settings Settings
 * ============================================================================
 *
 * Settings regarding the windows of the Battle System BTB. These mostly adjust
 * how certain aspects of the Brave Turn Battle system appear in-game.
 *
 * ---
 *
 * Window_ActorCommand
 * 
 *   Command Text:
 *   - What is the text that appears for the Brave command?
 * 
 *   Show Command?:
 *   - Show the Brave command in the Actor Command Window?
 * 
 *   Page Up/Dn Shortcuts?:
 *   - Use Page Up/Down for shortcuts on activating Brave?
 * 
 *   JS: Draw Counters:
 *   - Code used to determine how the action counters are displayed on
 *     the window.
 * 
 *     Action Slot:
 *     - This is the text used to represent a non-selected action slot.
 * 
 *     Current Action:
 *     - This is the text used to represent the current action slot.
 *
 * ---
 *
 * Window_BattleStatus
 * 
 *   Display Format:
 *   - How are actor Brave Point displayed?
 *   - %1 - Total BP, %2 - BP Text, %3 - Icon
 * 
 *   Predict Format:
 *   - How are predicted Brave Point displayed?
 *   - %1 - Total BP, %2 - BP Text, %3 - Icon, %4 - Predicted
 *
 * ---
 *
 * Window_BattleStatus > Text Colors
 * 
 *   Neutral Color:
 *   - Text code color for neutral number values.
 * 
 *   Positive Color:
 *   - Text code color for positive number values.
 * 
 *   Negative Color:
 *   - Text code color for negative number values.
 *
 * ---
 *
 * Window_BattleStatus > Style Settings > Default Style
 *
 * Window_BattleStatus > Style Settings > List Style
 *
 * Window_BattleStatus > Style Settings > XP Style
 *
 * Window_BattleStatus > Style Settings > Portrait Style
 *
 * Window_BattleStatus > Style Settings > Border Style
 *
 * Window_BattleStatus > Style Settings > Alignment Style
 * 
 *   Show Display?:
 *   - Show the actor's BP values in the Battle Status Window?
 * 
 *   Alignment:
 *   - How do you want the actor BP values to be aligned?
 * 
 *   Offset X:
 *   Offset Y:
 *   - Offset the actor BP display X/Y by how many pixels?
 *
 * ---
 *
 * ============================================================================
 * Terms of Use
 * ============================================================================
 *
 * 1. These plugins may be used in free or commercial games provided that they
 * have been acquired through legitimate means at VisuStella.com and/or any
 * other official approved VisuStella sources. Exceptions and special
 * circumstances that may prohibit usage will be listed on VisuStella.com.
 * 
 * 2. All of the listed coders found in the Credits section of this plugin must
 * be given credit in your games or credited as a collective under the name:
 * "VisuStella".
 * 
 * 3. You may edit the source code to suit your needs, so long as you do not
 * claim the source code belongs to you. VisuStella also does not take
 * responsibility for the plugin if any changes have been made to the plugin's
 * code, nor does VisuStella take responsibility for user-provided custom code
 * used for custom control effects including advanced JavaScript notetags
 * and/or plugin parameters that allow custom JavaScript code.
 * 
 * 4. You may NOT redistribute these plugins nor take code from this plugin to
 * use as your own. These plugins and their code are only to be downloaded from
 * VisuStella.com and other official/approved VisuStella sources. A list of
 * official/approved sources can also be found on VisuStella.com.
 *
 * 5. VisuStella is not responsible for problems found in your game due to
 * unintended usage, incompatibility problems with plugins outside of the
 * VisuStella MZ library, plugin versions that aren't up to date, nor
 * responsible for the proper working of compatibility patches made by any
 * third parties. VisuStella is not responsible for errors caused by any
 * user-provided custom code used for custom control effects including advanced
 * JavaScript notetags and/or plugin parameters that allow JavaScript code.
 *
 * 6. If a compatibility patch needs to be made through a third party that is
 * unaffiliated with VisuStella that involves using code from the VisuStella MZ
 * library, contact must be made with a member from VisuStella and have it
 * approved. The patch would be placed on VisuStella.com as a free download
 * to the public. Such patches cannot be sold for monetary gain, including
 * commissions, crowdfunding, and/or donations.
 * 
 * 7. If this VisuStella MZ plugin is a paid product, all project team members
 * must purchase their own individual copies of the paid product if they are to
 * use it. Usage includes working on related game mechanics, managing related
 * code, and/or using related Plugin Commands and features. Redistribution of
 * the plugin and/or its code to other members of the team is NOT allowed
 * unless they own the plugin itself as that conflicts with Article 4.
 * 
 * 8. Any extensions and/or addendums made to this plugin's Terms of Use can be
 * found on VisuStella.com and must be followed.
 *
 * ============================================================================
 * Credits
 * ============================================================================
 * 
 * If you are using this plugin, credit the following people in your game:
 * 
 * Team VisuStella
 * * Yanfly
 * * Arisu
 * * Olivia
 * * Irina
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 * 
 * Version 1.13: August 18, 2022
 * * Bug Fixes!
 * ** Fixed bugs that caused the BTB Turn Order faces and icons to not change
 *    properly for actors and enemies. Fix made by Olivia.
 * 
 * Version 1.12: August 11, 2022
 * * Bug Fixes!
 * ** Fixed a bug that caused a crash due to removing actors midway in battle.
 *    Fix made by Olivia.
 * 
 * Version 1.11: July 7, 2022
 * * Compatibility Update!
 * ** Plugin is now updated to support larger than 8 troop sizes.
 * 
 * Version 1.10: June 9, 2022
 * * Compatibility Update
 * ** Plugins should be more compatible with one another.
 * 
 * Version 1.09: March 3, 2022
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.08: January 13, 2022
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.07: May 21, 2021
 * * Bug Fixes!
 * ** Using items and skills outside of battle will no longer have BP
 *    restrictions imposed upon them. Fix made by Olivia.
 * 
 * Version 1.06: March 26, 2021
 * * Documentation Update!
 * ** Added "VisuStella MZ Compatibility" section for detailed compatibility
 *    explanations with the VisuMZ_3_BoostAction plugin.
 * 
 * Version 1.05: March 19, 2021
 * * Feature Update!
 * ** Turn Order Window calculations slightly tweaked for times when the window
 *    layer is bigger than it should be. Update made by Olivia.
 * 
 * Version 1.04: March 5, 2021
 * * Bug Fixes!
 * ** <BTB User Set BP: x>, <BTB User Gain BP: +x>, <BTB User Lose BP: -x>
 *    notetags should no work properly. Fix made by Arisu.
 * 
 * Version 1.03: January 22, 2021
 * * Feature Update!
 * ** A different kind of end battle check is now made to determine hiding the
 *    turn order display. Update made by Olivia.
 * 
 * Version 1.02: January 1, 2021
 * * Compatibility Update
 * ** Added compatibility functionality for future plugins.
 * 
 * Version 1.01: December 25, 2020
 * * Bug Fixes!
 * ** Brave Point preview in the battle status will now be bound by the
 *    absolute minimum hard card and the maximum soft cap. Fixed by Yanfly.
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Notetag added by Yanfly.
 * *** <BTB Enable Fusion>
 *
 * Version 1.00: January 4, 2021
 * * Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @ --------------------------------------------------------------------------
 *
 * @command BtbTurnOrderActorIcon
 * @text Actor: Change BTB Turn Order Icon
 * @desc Changes the icons used for the specific actor(s) on the BTB Turn Order.
 *
 * @arg Actors:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) to affect.
 * @default ["1"]
 *
 * @arg IconIndex:num
 * @text Icon
 * @desc Changes the graphic to this icon.
 * @default 84
 *
 * @ --------------------------------------------------------------------------
 *
 * @command BtbTurnOrderActorFace
 * @text Actor: Change BTB Turn Order Face
 * @desc Changes the faces used for the specific actor(s) on the BTB Turn Order.
 *
 * @arg Actors:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) to affect.
 * @default ["1"]
 *
 * @arg FaceName:str
 * @text Face Name
 * @type file
 * @dir img/faces/
 * @desc This is the filename for the target face graphic.
 * @default Actor1
 *
 * @arg FaceIndex:num
 * @text Face Index
 * @type number
 * @desc This is the index for the target face graphic.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command BtbTurnOrderClearActorGraphic
 * @text Actor: Clear BTB Turn Order Graphic
 * @desc Clears the BTB Turn Order graphics for the actor(s).
 * The settings will revert to the Plugin Parameter settings.
 *
 * @arg Actors:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) to affect.
 * @default ["1"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command BtbTurnOrderEnemyIcon
 * @text Enemy: Change BTB Turn Order Icon
 * @desc Changes the icons used for the specific enemy(ies) on the BTB Turn Order.
 *
 * @arg Enemies:arraynum
 * @text Enemy Index(es)
 * @type number[]
 * @desc Select which enemy index(es) to affect.
 * @default ["1"]
 *
 * @arg IconIndex:num
 * @text Icon
 * @desc Changes the graphic to this icon.
 * @default 298
 *
 * @ --------------------------------------------------------------------------
 *
 * @command BtbTurnOrderEnemyFace
 * @text Enemy: Change BTB Turn Order Face
 * @desc Changes the faces used for the specific enemy(ies) on the BTB Turn Order.
 *
 * @arg Enemies:arraynum
 * @text Enemy Index(es)
 * @type number[]
 * @desc Select which enemy index(es) to affect.
 * @default ["1"]
 *
 * @arg FaceName:str
 * @text Face Name
 * @parent EnemySprite
 * @type file
 * @dir img/faces/
 * @desc This is the filename for the target face graphic.
 * @default Monster
 *
 * @arg FaceIndex:num
 * @text Face Index
 * @parent EnemySprite
 * @type number
 * @desc This is the index for the target face graphic.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command BtbTurnOrderClearEnemyGraphic
 * @text Enemy: Clear BTB Turn Order Graphic
 * @desc Clears the BTB Turn Order graphics for the enemy(ies).
 * The settings will revert to the Plugin Parameter settings.
 *
 * @arg Enemies:arraynum
 * @text Enemy Index(es)
 * @type number[]
 * @desc Select which enemy index(es) to affect.
 * @default ["1"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemTurnOrderVisibility
 * @text System: BTB Turn Order Visibility
 * @desc Determine the visibility of the BTB Turn Order Display.
 *
 * @arg Visible:eval
 * @text Visibility
 * @type boolean
 * @on Visible
 * @off Hidden
 * @desc Changes the visibility of the BTB Turn Order Display.
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @ ==========================================================================
 * @ Plugin Parameters
 * @ ==========================================================================
 *
 * @param BreakHead
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param BattleSystemBTB
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param General:struct
 * @text General Settings
 * @type struct<General>
 * @desc General settings regarding Battle System BTB.
 * @default {"BravePoints":"","BravePointsFull:str":"Brave Points","BravePointsAbbr:str":"BP","BravePointsIcon:num":"73","BravePointCostFmt:str":"\\FS[22]\\C[4]%1\\C[6]%2\\C[0]","DisplayedCosts":"","CostPosition:eval":"false","ShowCostForAttack:eval":"false","ShowCostForGuard:eval":"false","ReduceShownBPCost:num":"0","Show_0_BP_Cost:eval":"true","Show_1_BP_Cost:eval":"true"}
 *
 * @param Mechanics:struct
 * @text Mechanics Settings
 * @type struct<Mechanics>
 * @desc Adjust the mechanics settings for the Battle System BTB.
 * @default {"ActionSpeed":"","AllowRandomSpeed:eval":"false","CalcActionSpeedJS:func":"\"// Declare Constants\\nconst agi = this.subject().agi;\\n\\n// Create Speed\\nlet speed = agi;\\nif (this.allowRandomSpeed()) {\\n    speed += Math.randomInt(Math.floor(5 + agi / 4));\\n}\\nif (this.item()) {\\n    speed += this.item().speed;\\n}\\nif (this.isAttack()) {\\n    speed += this.subject().attackSpeed();\\n}\\n\\n// Return Speed\\nreturn speed;\"","ActionMax":"","MaxActionsDefault:num":"4","MaxActionsHardCap:num":"9","BravePoints":"","BravePointsLimits":"","MaxBravePointsDefault:num":"3","MinBravePointsDefault:num":"-4","MaxBravePointsHardCap:num":"9","MinBravePointsHardCap:num":"-9","BravePointsCosts":"","BravePointSkillCost:num":"1","BravePointItemCost:num":"1","BravePointPredictedCost:num":"1","BravePointsStartBattle":"","BravePointStartNeutral:num":"0","BravePointStartFavor:num":"3","BravePointsRegen":"","BravePointRegenBase:num":"1","BravePointsRegenAlive:eval":"true","ActionFusions":"","ActorActionFusions:eval":"true","EnemyActionFusions:eval":"true"}
 *
 * @param BraveAnimation:struct
 * @text Brave Animations
 * @type struct<BraveAnimation>
 * @desc Animation when applying/canceling Brave effects.
 * @default {"OnBrave":"","BraveAnimationID:num":"12","BraveMirror:eval":"false","BraveMute:eval":"false","CancelBrave":"","CancelAnimationID:num":"62","CancelMirror:eval":"false","CancelMute:eval":"false"}
 *
 * @param TurnOrder:struct
 * @text Turn Order Display
 * @type struct<TurnOrder>
 * @desc Turn Order Display settings used for Battle System BTB.
 * @default {"General":"","DisplayPosition:str":"top","DisplayOffsetX:num":"0","DisplayOffsetY:num":"0","CenterHorz:eval":"true","RepositionTopForHelp:eval":"true","RepositionLogWindow:eval":"true","OrderDirection:eval":"true","SubjectDistance:num":"8","ScreenBuffer:num":"20","Reposition":"","RepositionTopHelpX:num":"0","RepositionTopHelpY:num":"96","Slots":"","MaxHorzSprites:num":"16","MaxVertSprites:num":"10","SpriteLength:num":"72","SpriteThin:num":"36","UpdateFrames:num":"24","Border":"","ShowMarkerBorder:eval":"true","BorderActor":"","ActorBorderColor:str":"4","ActorSystemBorder:str":"","BorderEnemy":"","EnemyBorderColor:str":"2","EnemySystemBorder:str":"","BorderThickness:num":"2","Sprite":"","ActorSprite":"","ActorBattlerType:str":"face","ActorBattlerIcon:num":"84","EnemySprite":"","EnemyBattlerType:str":"enemy","EnemyBattlerFaceName:str":"Monster","EnemyBattlerFaceIndex:num":"1","EnemyBattlerIcon:num":"298","EnemyBattlerMatchHue:eval":"true","Letter":"","EnemyBattlerDrawLetter:eval":"true","EnemyBattlerFontFace:str":"","EnemyBattlerFontSize:num":"16","Background":"","ShowMarkerBg:eval":"true","BackgroundActor":"","ActorBgColor1:str":"19","ActorBgColor2:str":"9","ActorSystemBg:str":"","BackgroundEnemy":"","EnemyBgColor1:str":"19","EnemyBgColor2:str":"18","EnemySystemBg:str":""}
 *
 * @param Window:struct
 * @text Window Settings
 * @type struct<Window>
 * @desc Settings regarding the windows of the Battle System BTB.
 * @default {"Window_ActorCommand":"","CommandName:str":"Brave","ShowCommand:eval":"true","BraveShortcuts:eval":"true","DrawActionCountersJS:func":"\"// Declare Constants\\nconst sprite = arguments[0];\\nconst parentWindow = arguments[1];\\nconst actor = arguments[2];\\n\\n// Set Location\\nsprite.x = Math.round(parentWindow.width / 2);\\nsprite.y = 0;\\nsprite.anchor.x = 0.5\\nsprite.anchor.y = 0.5\\n\\n// Create Text\\nconst textSlot = TextManager.btbActionSlot;\\nconst textCurrent = TextManager.btbActionCurrent;\\nlet text = textSlot.repeat(actor.numActions());\\nconst index = actor._actionInputIndex;\\ntext = text.substring(0, index) + textCurrent + text.substring(index + 1);\\n\\n// Create and Draw Bitmap\\nconst bitmap = new Bitmap(parentWindow.width, parentWindow.lineHeight());\\nbitmap.fontSize = 36;\\nbitmap.drawText(text, 0, 0, bitmap.width, bitmap.height, 'center');\\nsprite.bitmap = bitmap;\"","ActionSlot:str":"○","ActionCurrent:str":"◉","Window_BattleStatus":"","StatusDisplayFmt:str":"\\FS[16]\\C[6]%2\\C[0] \\FS[22]%1","StatusPredictFmt:str":"\\FS[16]\\C[6]%2\\C[0] \\FS[22]%1\\FS[16] → \\FS[22]%4","TextColors":"","NeutralColor:num":"0","PositiveColor:num":"4","NegativeColor:num":"2","Styles":"","DefaultStyle":"","default_display:eval":"true","default_align:str":"right","default_offsetX:num":"16","default_offsetY:num":"0","ListStyle":"","list_display:eval":"true","list_align:str":"left","list_offsetX:num":"-8","list_offsetY:num":"0","XPStyle":"","xp_display:eval":"true","xp_align:str":"right","xp_offsetX:num":"16","xp_offsetY:num":"0","PortraitStyle":"","portrait_display:eval":"true","portrait_align:str":"right","portrait_offsetX:num":"-8","portrait_offsetY:num":"56","BorderStyle":"","border_display:eval":"true","border_align:str":"right","border_offsetX:num":"16","border_offsetY:num":"0"}
 *
 * @param BreakEnd1
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param End Of
 * @default Plugin Parameters
 *
 * @param BreakEnd2
 * @text --------------------------
 * @default ----------------------------------
 *
 */
/* ----------------------------------------------------------------------------
 * General Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~General:
 *
 * @param BravePoints
 * @text Brave Points
 *
 * @param BravePointsFull:str
 * @text Full Name
 * @parent BravePoints
 * @desc What is the full name of "Brave Points" in your game?
 * @default Brave Points
 *
 * @param BravePointsAbbr:str
 * @text Abbreviation
 * @parent BravePoints
 * @desc What is the abbreviation of "Brave Points" in your game?
 * @default BP
 *
 * @param BravePointsIcon:num
 * @text Icon
 * @parent BravePoints
 * @desc What icon do you wish to use to represent Brave Points?
 * @default 73
 *
 * @param BravePointCostFmt:str
 * @text Cost Format
 * @parent BravePoints
 * @desc How are Brave Point costs displayed?
 * %1 - Cost, %2 - BP Text, %3 - Icon
 * @default \FS[22]\C[4]%1\C[6]%2\C[0]
 *
 * @param DisplayedCosts
 * @text Displayed Costs
 *
 * @param CostPosition:eval
 * @text Cost Position Front?
 * @parent DisplayedCosts
 * @type boolean
 * @on Front
 * @off Back
 * @desc Put the BP Cost at the front of skill/item costs?
 * @default false
 *
 * @param ShowCostForAttack:eval
 * @text Show Cost: Attack
 * @parent DisplayedCosts
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show the BP cost for the Attack command?
 * @default false
 *
 * @param ShowCostForGuard:eval
 * @text Show Cost: Guard
 * @parent DisplayedCosts
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show the BP cost for the Guard command?
 * @default false
 *
 * @param ReduceShownBPCost:num
 * @text Reduce Shown BP Cost
 * @parent DisplayedCosts
 * @type number
 * @desc Reduce shown BP costs by this much.
 * Used to match traditional games.
 * @default 0
 *
 * @param Show_0_BP_Cost:eval
 * @text Show Cost: 0 BP
 * @parent DisplayedCosts
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show the BP cost when the cost is 0 BP?
 * Shown BP Cost reduction is applied.
 * @default true
 *
 * @param Show_1_BP_Cost:eval
 * @text Show Cost: 1 BP
 * @parent DisplayedCosts
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show the BP cost when the cost is 1 BP?
 * Shown BP Cost reduction is applied.
 * @default true
 *
 */
/* ----------------------------------------------------------------------------
 * Mechanics Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Mechanics:
 *
 * @param ActionSpeed
 * @text Action Speed
 *
 * @param AllowRandomSpeed:eval
 * @text Allow Random Speed?
 * @parent ActionSpeed
 * @type boolean
 * @on Allow
 * @off Disable
 * @desc Allow speed to be randomized base off the user's AGI?
 * @default false
 *
 * @param CalcActionSpeedJS:func
 * @text JS: Calculate
 * @parent ActionSpeed
 * @type note
 * @desc Code used to calculate action speed.
 * @default "// Declare Constants\nconst agi = this.subject().agi;\n\n// Create Speed\nlet speed = agi;\nif (this.allowRandomSpeed()) {\n    speed += Math.randomInt(Math.floor(5 + agi / 4));\n}\nif (this.item()) {\n    speed += this.item().speed;\n}\nif (this.isAttack()) {\n    speed += this.subject().attackSpeed();\n}\n\n// Return Speed\nreturn speed;"
 *
 * @param ActionMax
 * @text Brave Action Max
 *
 * @param MaxActionsDefault:num
 * @text Default
 * @parent ActionMax
 * @type number
 * @min 1
 * @desc What is the default number of max actions a battler can 
 * have from the Brave system?
 * @default 4
 *
 * @param MaxActionsHardCap:num
 * @text Hard Cap
 * @parent ActionMax
 * @type number
 * @min 1
 * @desc What is the absolute highest for maximum actions a battler
 * can have from the Brave system?
 * @default 9
 *
 * @param BravePoints
 * @text Brave Points
 *
 * @param BravePointsLimits
 * @text Limits
 * @parent BravePoints
 *
 * @param MaxBravePointsDefault:num
 * @text Default Maximum
 * @parent BravePointsLimits
 * @type number
 * @min 1
 * @desc What is the default maximum number of Brave Points a
 * battler can have at a time?
 * @default 3
 *
 * @param MinBravePointsDefault:num
 * @text Default Minimum
 * @parent BravePointsLimits
 * @desc What is the default minimum number of Brave Points a
 * battler can have at a time?
 * @default -4
 *
 * @param MaxBravePointsHardCap:num
 * @text Hard Cap Maximum
 * @parent BravePointsLimits
 * @type number
 * @min 1
 * @desc What is the absolute maximum number of Brave Points a
 * battler can have at a time?
 * @default 9
 *
 * @param MinBravePointsHardCap:num
 * @text Hard Cap Minimum
 * @parent BravePointsLimits
 * @desc What is the absolute minimum number of Brave Points a
 * battler can have at a time?
 * @default -9
 *
 * @param BravePointsCosts
 * @text Costs
 * @parent BravePoints
 *
 * @param BravePointSkillCost:num
 * @text Default Skill Cost
 * @parent BravePointsCosts
 * @type number
 * @min 0
 * @desc How many Brave Points does a skill cost by default?
 * @default 1
 *
 * @param BravePointItemCost:num
 * @text Default Item Cost
 * @parent BravePointsCosts
 * @type number
 * @min 0
 * @desc How many Brave Points does an item cost by default?
 * @default 1
 *
 * @param BravePointPredictedCost:num
 * @text Predicted Cost
 * @parent BravePointsCosts
 * @type number
 * @min 0
 * @desc What is considered predicted cost?
 * @default 1
 *
 * @param BravePointsStartBattle
 * @text Start Battle
 * @parent BravePoints
 *
 * @param BravePointStartNeutral:num
 * @text Neutral
 * @parent BravePointsStartBattle
 * @desc How many Brave Points should a battler have if the
 * battle advantage is neutral?
 * @default 0
 *
 * @param BravePointStartFavor:num
 * @text Favored
 * @parent BravePointsStartBattle
 * @desc How many Brave Points should a battler have if the
 * battle advantage is favored?
 * @default 3
 *
 * @param BravePointsRegen
 * @text Regeneration
 * @parent BravePoints
 *
 * @param BravePointRegenBase:num
 * @text Base Recovery
 * @parent BravePointsRegen
 * @type number
 * @min 0
 * @desc How many Brave Points are regenerated at the end
 * of each turn?
 * @default 1
 *
 * @param BravePointsRegenAlive:eval
 * @text Needs to be Alive?
 * @parent BravePointsRegen
 * @type boolean
 * @on Alive
 * @off Can Be Dead
 * @desc Do battlers need to be alive to regenerate Brave Points?
 * @default true
 *
 * @param ActionFusions
 * @text Action Fusions
 *
 * @param ActorActionFusions:eval
 * @text Actor Access?
 * @parent ActionFusions
 * @type boolean
 * @on Allow
 * @off Disable
 * @desc Allow actors access to Action Fusions?
 * @default true
 *
 * @param EnemyActionFusions:eval
 * @text Enemy Access?
 * @parent ActionFusions
 * @type boolean
 * @on Allow
 * @off Disable
 * @desc Allow enemies access to Action Fusions?
 * @default true
 *
 */
/* ----------------------------------------------------------------------------
 * BraveAnimation Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~BraveAnimation:
 *
 * @param OnBrave
 * @text On Brave
 *
 * @param BraveAnimationID:num
 * @text Animation ID
 * @parent OnBrave
 * @type animation
 * @desc Play this animation when the effect activates.
 * @default 12
 *
 * @param BraveMirror:eval
 * @text Mirror Animation
 * @parent OnBrave
 * @type boolean
 * @on Mirror
 * @off Normal
 * @desc Mirror the effect animation?
 * @default false
 *
 * @param BraveMute:eval
 * @text Mute Animation
 * @parent OnBrave
 * @type boolean
 * @on Mute
 * @off Normal
 * @desc Mute the effect animation?
 * @default false
 *
 * @param CancelBrave
 * @text Cancel Brave
 *
 * @param CancelAnimationID:num
 * @text Animation ID
 * @parent CancelBrave
 * @type animation
 * @desc Play this animation when the effect activates.
 * @default 62
 *
 * @param CancelMirror:eval
 * @text Mirror Animation
 * @parent CancelBrave
 * @type boolean
 * @on Mirror
 * @off Normal
 * @desc Mirror the effect animation?
 * @default false
 *
 * @param CancelMute:eval
 * @text Mute Animation
 * @parent CancelBrave
 * @type boolean
 * @on Mute
 * @off Normal
 * @desc Mute the effect animation?
 * @default false
 *
 * @param EnemyBrave
 * @text Enemy Brave
 *
 * @param ShowEnemyBrave:eval
 * @text Show Activation?
 * @parent EnemyBrave
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show the enemy activating Brave?
 * @default true
 *
 * @param WaitFrames:num
 * @text Wait Frames
 * @parent EnemyBrave
 * @type number
 * @desc This is the number of frames to wait between activations.
 * @default 20
 *
 */
/* ----------------------------------------------------------------------------
 * Turn Order Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~TurnOrder:
 *
 * @param General
 *
 * @param DisplayPosition:str
 * @text Display Position
 * @parent General
 * @type select
 * @option top
 * @option bottom
 * @option left
 * @option right
 * @desc Select where the Turn Order will appear on the screen.
 * @default top
 * 
 * @param DisplayOffsetX:num
 * @text Offset X
 * @parent DisplayPosition:str
 * @desc How much to offset the X coordinate by.
 * Negative: left. Positive: right.
 * @default 0
 * 
 * @param DisplayOffsetY:num
 * @text Offset Y
 * @parent DisplayPosition:str
 * @desc How much to offset the Y coordinate by.
 * Negative: up. Positive: down.
 * @default 0
 *
 * @param CenterHorz:eval
 * @text Center Horizontal?
 * @parent DisplayPosition:str
 * @type boolean
 * @on Center
 * @off Stay
 * @desc Reposition the Turn Order Display to always be centered
 * if it is a 'top' or 'bottom' position?
 * @default true
 *
 * @param RepositionTopForHelp:eval
 * @text Reposition for Help?
 * @parent DisplayPosition:str
 * @type boolean
 * @on Reposition
 * @off Stay
 * @desc If the display position is at the top, reposition the
 * display when the help window is open?
 * @default true
 *
 * @param RepositionLogWindow:eval
 * @text Reposition Log?
 * @parent DisplayPosition:str
 * @type boolean
 * @on Reposition
 * @off Stay
 * @desc If the display position is at the top, reposition the
 * Battle Log Window to be lower?
 * @default true
 *
 * @param OrderDirection:eval
 * @text Forward Direction
 * @parent General
 * @type boolean
 * @on Left to Right / Down to Up
 * @off Right to Left / Up to Down
 * @desc Decide on the direction of the Turn Order.
 * Settings may vary depending on position.
 * @default true
 *
 * @param SubjectDistance:num
 * @text Subject Distance
 * @parent General
 * @type number
 * @desc How far do you want the currently active battler to
 * distance itself from the rest of the Turn Order?
 * @default 8
 *
 * @param ScreenBuffer:num
 * @text Screen Buffer
 * @parent General
 * @type number
 * @desc What distance do you want the display to be away
 * from the edge of the screen by?
 * @default 20
 * 
 * @param Reposition
 * @text Reposition For Help
 *
 * @param RepositionTopHelpX:num
 * @text Repostion X By
 * @parent Reposition
 * @desc Reposition the display's X coordinates by this much when
 * the Help Window is visible.
 * @default 0
 *
 * @param RepositionTopHelpY:num
 * @text Repostion Y By
 * @parent Reposition
 * @desc Reposition the display's Y coordinates by this much when
 * the Help Window is visible.
 * @default 96
 * 
 * @param Slots
 *
 * @param MaxHorzSprites:num
 * @text Max Horizontal
 * @parent Slots
 * @type number
 * @min 1
 * @desc Maximum slots you want to display for top and
 * bottom Turn Order Display positions?
 * @default 16
 *
 * @param MaxVertSprites:num
 * @text Max Vertical
 * @parent Slots
 * @type number
 * @min 1
 * @desc Maximum slots you want to display for left and
 * right Turn Order Display positions?
 * @default 10
 *
 * @param SpriteLength:num
 * @text Length
 * @parent Slots
 * @type number
 * @min 1
 * @desc How many pixels long should the slots be on the
 * Turn Order display?
 * @default 72
 *
 * @param SpriteThin:num
 * @text Thin
 * @parent Slots
 * @type number
 * @min 1
 * @desc How many pixels thin should the slots be on the
 * Turn Order display?
 * @default 36
 *
 * @param UpdateFrames:num
 * @text Update Frames
 * @parent Slots
 * @type number
 * @min 1
 * @desc How many frames should it take for the slots to
 * update their positions by?
 * @default 24
 *
 * @param Border
 * @text Slot Border
 *
 * @param ShowMarkerBorder:eval
 * @text Show Border?
 * @parent Border
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show borders for the slot sprites?
 * @default true
 *
 * @param BorderThickness:num
 * @text Border Thickness
 * @parent Markers
 * @type number
 * @min 1
 * @desc How many pixels thick should the colored portion of the border be?
 * @default 2
 *
 * @param BorderActor
 * @text Actors
 * @parent Border
 *
 * @param ActorBorderColor:str
 * @text Border Color
 * @parent BorderActor
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 4
 *
 * @param ActorSystemBorder:str
 * @text Border Skin
 * @parent BorderActor
 * @type file
 * @dir img/system/
 * @desc Optional. Place a skin on the actor borders instead of rendering them?
 * @default 
 *
 * @param BorderEnemy
 * @text Enemies
 * @parent Border
 *
 * @param EnemyBorderColor:str
 * @text Border Color
 * @parent BorderEnemy
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 2
 *
 * @param EnemySystemBorder:str
 * @text Border Skin
 * @parent BorderEnemy
 * @type file
 * @dir img/system/
 * @desc Optional. Place a skin on the enemy borders instead of rendering them?
 * @default 
 *
 * @param Sprite
 * @text Slot Sprites
 *
 * @param ActorSprite
 * @text Actors
 * @parent Sprite
 *
 * @param ActorBattlerType:str
 * @text Sprite Type
 * @parent ActorSprite
 * @type select
 * @option Face Graphic - Show the actor's face.
 * @value face
 * @option Icon - Show a specified icon.
 * @value icon
 * @option Sideview Actor - Show the actor's sideview battler.
 * @value svactor
 * @desc Select the type of sprite used for the actor graphic.
 * @default face
 *
 * @param ActorBattlerIcon:num
 * @text Default Icon
 * @parent ActorSprite
 * @desc Which icon do you want to use for actors by default?
 * @default 84
 *
 * @param EnemySprite
 * @text Enemies
 * @parent Sprite
 *
 * @param EnemyBattlerType:str
 * @text Sprite Type
 * @parent EnemySprite
 * @type select
 * @option Face Graphic - Show a specified face graphic.
 * @value face
 * @option Icon - Show a specified icon.
 * @value icon
 * @option Enemy - Show the enemy's graphic or sideview battler.
 * @value enemy
 * @desc Select the type of sprite used for the enemy graphic.
 * @default enemy
 *
 * @param EnemyBattlerFaceName:str
 * @text Default Face Name
 * @parent EnemySprite
 * @type file
 * @dir img/faces/
 * @desc Use this default face graphic if there is no specified face.
 * @default Monster
 *
 * @param EnemyBattlerFaceIndex:num
 * @text Default Face Index
 * @parent EnemySprite
 * @type number
 * @desc Use this default face index if there is no specified index.
 * @default 1
 *
 * @param EnemyBattlerIcon:num
 * @text Default Icon
 * @parent EnemySprite
 * @desc Which icon do you want to use for enemies by default?
 * @default 298
 *
 * @param EnemyBattlerMatchHue:eval
 * @text Match Hue?
 * @parent EnemySprite
 * @type boolean
 * @on Match
 * @off Don't Match
 * @desc Match the hue for enemy battlers?
 * Does not apply if there's a sideview battler.
 * @default true
 *
 * @param Letter
 * @text Slot Letter
 *
 * @param EnemyBattlerDrawLetter:eval
 * @text Show Enemy Letter?
 * @parent Letter
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show the enemy's letter on the slot sprite?
 * @default true
 *
 * @param EnemyBattlerFontFace:str
 * @text Font Name
 * @parent Letter
 * @desc The font name used for the text of the Letter.
 * Leave empty to use the default game's font.
 * @default 
 *
 * @param EnemyBattlerFontSize:num
 * @text Font Size
 * @parent Letter
 * @min 1
 * @desc The font size used for the text of the Letter.
 * @default 16
 *
 * @param Background
 * @text Slot Background
 *
 * @param ShowMarkerBg:eval
 * @text Show Background?
 * @parent Background
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show the background on the slot sprite?
 * @default true
 *
 * @param BackgroundActor
 * @text Actors
 * @parent Background
 *
 * @param ActorBgColor1:str
 * @text Background Color 1
 * @parent BackgroundActor
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 19
 *
 * @param ActorBgColor2:str
 * @text Background Color 2
 * @parent BackgroundActor
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 9
 *
 * @param ActorSystemBg:str
 * @text Background Skin
 * @parent BackgroundActor
 * @type file
 * @dir img/system/
 * @desc Optional. Use a skin for the actor background instead of rendering them?
 * @default 
 *
 * @param BackgroundEnemy
 * @text Enemies
 * @parent Background
 *
 * @param EnemyBgColor1:str
 * @text Background Color 1
 * @parent BackgroundEnemy
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 19
 *
 * @param EnemyBgColor2:str
 * @text Background Color 2
 * @parent BackgroundEnemy
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 18
 *
 * @param EnemySystemBg:str
 * @text Background Skin
 * @parent BackgroundEnemy
 * @type file
 * @dir img/system/
 * @desc Optional. Use a skin for the enemy background instead of rendering them?
 * @default 
 *
 */
/* ----------------------------------------------------------------------------
 * Window Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Window:
 *
 * @param Window_ActorCommand
 *
 * @param CommandName:str
 * @text Command Text
 * @parent Window_ActorCommand
 * @desc What is the text that appears for the Brave command?
 * @default Brave
 *
 * @param ShowCommand:eval
 * @text Show Command?
 * @parent Window_ActorCommand
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show the Brave command in the Actor Command Window?
 * @default true
 *
 * @param BraveShortcuts:eval
 * @text Page Up/Dn Shortcuts?
 * @parent Window_ActorCommand
 * @type boolean
 * @on Use Shortcuts
 * @off Don't Use
 * @desc Use Page Up/Down for shortcuts on activating Brave?
 * @default true
 *
 * @param DrawActionCountersJS:func
 * @text JS: Draw Counters
 * @parent Window_ActorCommand
 * @type note
 * @desc Code used to determine how the action counters are
 * displayed on the window.
 * @default "// Declare Constants\nconst sprite = arguments[0];\nconst parentWindow = arguments[1];\nconst actor = arguments[2];\n\n// Set Location\nsprite.x = Math.round(parentWindow.width / 2);\nsprite.y = 0;\nsprite.anchor.x = 0.5\nsprite.anchor.y = 0.5\n\n// Create Text\nconst textSlot = TextManager.btbActionSlot;\nconst textCurrent = TextManager.btbActionCurrent;\nlet text = textSlot.repeat(actor.numActions());\nconst index = actor._actionInputIndex;\ntext = text.substring(0, index) + textCurrent + text.substring(index + 1);\n\n// Create and Draw Bitmap\nconst bitmap = new Bitmap(parentWindow.width, parentWindow.lineHeight());\nbitmap.fontSize = 36;\nbitmap.drawText(text, 0, 0, bitmap.width, bitmap.height, 'center');\nsprite.bitmap = bitmap;"
 *
 * @param ActionSlot:str
 * @text Action Slot
 * @parent DrawActionCountersJS:func
 * @desc This is the text used to represent a non-selected action slot.
 * @default ○
 *
 * @param ActionCurrent:str
 * @text Current Action
 * @parent DrawActionCountersJS:func
 * @desc This is the text used to represent the current action slot.
 * @default ◉
 *
 * @param Window_BattleStatus
 *
 * @param StatusDisplayFmt:str
 * @text Display Format
 * @parent Window_BattleStatus
 * @desc How are actor Brave Point displayed?
 * %1 - Total BP, %2 - BP Text, %3 - Icon
 * @default \FS[16]\C[6]%2\C[0] \FS[22]%1
 *
 * @param StatusPredictFmt:str
 * @text Predict Format
 * @parent Window_BattleStatus
 * @desc How are predicted Brave Point displayed?
 * %1 - Total BP, %2 - BP Text, %3 - Icon, %4 - Predicted
 * @default \FS[16]\C[6]%2\C[0] \FS[22]%1\FS[16] → \FS[22]%4
 *
 * @param TextColors
 * @text Text Colors
 * @parent Window_BattleStatus
 *
 * @param NeutralColor:num
 * @text Neutral Color
 * @parent TextColors
 * @desc Text code color for neutral number values.
 * @default 0
 *
 * @param PositiveColor:num
 * @text Positive Color
 * @parent TextColors
 * @desc Text code color for positive number values.
 * @default 4
 *
 * @param NegativeColor:num
 * @text Negative Color
 * @parent TextColors
 * @desc Text code color for negative number values.
 * @default 2
 *
 * @param Styles
 * @text Style Settings
 * @parent Window_BattleStatus
 *
 * @param DefaultStyle
 * @text Default Style
 * @parent Styles
 *
 * @param default_display:eval
 * @text Show Display?
 * @parent DefaultStyle
 * @type boolean
 * @on Show
 * @off Don't Show
 * @desc Show the actor's BP values in the Battle Status Window?
 * @default true
 *
 * @param default_align:str
 * @text Alignment
 * @parent DefaultStyle
 * @type combo
 * @option left
 * @option center
 * @option right
 * @desc How do you want the actor BP values to be aligned?
 * @default right
 *
 * @param default_offsetX:num
 * @text Offset X
 * @parent DefaultStyle
 * @desc Offset the actor BP display X by how many pixels?
 * @default 16
 *
 * @param default_offsetY:num
 * @text Offset Y
 * @parent DefaultStyle
 * @desc Offset the actor BP display Y by how many pixels?
 * @default 0
 *
 * @param ListStyle
 * @text List Style
 * @parent Styles
 *
 * @param list_display:eval
 * @text Show Display?
 * @parent ListStyle
 * @type boolean
 * @on Show
 * @off Don't Show
 * @desc Show the actor's BP values in the Battle Status Window?
 * @default true
 *
 * @param list_align:str
 * @text Alignment
 * @parent ListStyle
 * @type combo
 * @option left
 * @option center
 * @option right
 * @desc How do you want the actor BP values to be aligned?
 * @default left
 *
 * @param list_offsetX:num
 * @text Offset X
 * @parent ListStyle
 * @desc Offset the actor BP display X by how many pixels?
 * @default -8
 *
 * @param list_offsetY:num
 * @text Offset Y
 * @parent ListStyle
 * @desc Offset the actor BP display Y by how many pixels?
 * @default 0
 *
 * @param XPStyle
 * @text XP Style
 * @parent Styles
 *
 * @param xp_display:eval
 * @text Show Display?
 * @parent XPStyle
 * @type boolean
 * @on Show
 * @off Don't Show
 * @desc Show the actor's BP values in the Battle Status Window?
 * @default true
 *
 * @param xp_align:str
 * @text Alignment
 * @parent XPStyle
 * @type combo
 * @option left
 * @option center
 * @option right
 * @desc How do you want the actor BP values to be aligned?
 * @default right
 *
 * @param xp_offsetX:num
 * @text Offset X
 * @parent XPStyle
 * @desc Offset the actor BP display X by how many pixels?
 * @default 16
 *
 * @param xp_offsetY:num
 * @text Offset Y
 * @parent XPStyle
 * @desc Offset the actor BP display Y by how many pixels?
 * @default 0
 *
 * @param PortraitStyle
 * @text Portrait Style
 * @parent Styles
 *
 * @param portrait_display:eval
 * @text Show Display?
 * @parent PortraitStyle
 * @type boolean
 * @on Show
 * @off Don't Show
 * @desc Show the actor's BP values in the Battle Status Window?
 * @default true
 *
 * @param portrait_align:str
 * @text Alignment
 * @parent PortraitStyle
 * @type combo
 * @option left
 * @option center
 * @option right
 * @desc How do you want the actor BP values to be aligned?
 * @default right
 *
 * @param portrait_offsetX:num
 * @text Offset X
 * @parent PortraitStyle
 * @desc Offset the actor BP display X by how many pixels?
 * @default -8
 *
 * @param portrait_offsetY:num
 * @text Offset Y
 * @parent PortraitStyle
 * @desc Offset the actor BP display Y by how many pixels?
 * @default 56
 *
 * @param BorderStyle
 * @text Border Style
 * @parent Styles
 *
 * @param border_display:eval
 * @text Show Display?
 * @parent BorderStyle
 * @type boolean
 * @on Show
 * @off Don't Show
 * @desc Show the actor's BP values in the Battle Status Window?
 * @default true
 *
 * @param border_align:str
 * @text Alignment
 * @parent BorderStyle
 * @type combo
 * @option left
 * @option center
 * @option right
 * @desc How do you want the actor BP values to be aligned?
 * @default right
 *
 * @param border_offsetX:num
 * @text Offset X
 * @parent BorderStyle
 * @desc Offset the actor BP display X by how many pixels?
 * @default 16
 *
 * @param border_offsetY:num
 * @text Offset Y
 * @parent BorderStyle
 * @desc Offset the actor BP display Y by how many pixels?
 * @default 0
 *
 */
//=============================================================================

const _0x2beff5=_0x5849;(function(_0x4aa098,_0x30e7da){const _0x2968b1=_0x5849,_0x4f3abb=_0x4aa098();while(!![]){try{const _0x52d111=-parseInt(_0x2968b1(0x372))/0x1+parseInt(_0x2968b1(0x2e0))/0x2+parseInt(_0x2968b1(0x2f1))/0x3+parseInt(_0x2968b1(0x1ee))/0x4*(-parseInt(_0x2968b1(0x194))/0x5)+-parseInt(_0x2968b1(0x377))/0x6+-parseInt(_0x2968b1(0x1e4))/0x7+-parseInt(_0x2968b1(0x1d4))/0x8*(-parseInt(_0x2968b1(0x212))/0x9);if(_0x52d111===_0x30e7da)break;else _0x4f3abb['push'](_0x4f3abb['shift']());}catch(_0x161f5c){_0x4f3abb['push'](_0x4f3abb['shift']());}}}(_0x3e50,0x3f90e));function _0x3e50(){const _0x42f9bc=['BTB_MAX_ACTIONS_HARD_CAP','ZXKpR','SLXmJ','_homeX','getActionFusionCombinationsBTB','Window_ActorCommand_makeCommandList','setAttack','VKTPa','optDisplayTp','cEQkh','_subject','icon','BattleCore','Game_Action_applyItemUserEffect','YFDfe','setActionFusionBTB','_scrollX','call','isForFriend','padding','allBattleMembers','getTotalActionFusionRecipes','includes','parameters','Scene_Battle_onDisabledPartyCommandSelection','textWidth','createTurnOrderBTBGraphicIconIndex','WwoEy','DisplayOffsetY','isDrawItemNumber','repositionLogWindowBTB','_btbItemStrictFusion','concat','iconHeight','startActionBTB','EnemyBattlerType','GLABA','makeMultiActionsBTB','ActionCurrent','BTB_MAX_ACTIONS_DEFAULT','BravePointsRegenAlive','visible','drawTextEx','oOASX','inBattle','btbCostFormat','containerPosition','205185rDoaUA','lineHeight','initMembers','close','canAddBraveCommand','1052502elzVJz','tfXsc','initHomePositions','Game_Battler_useItem','OrderDirection','BEEOO','getAlignmentBTB','mNjuj','addGuardCommand','Scene_Boot_onDatabaseLoaded','HIUBq','btbRegisterFusions','updateSidePosition','commandBrave','mainFontFace','destroy','qALkv','Game_Action_setSkill','Cancel','battleLayoutStyle','bitmapWidth','cursorPageup','checkPosition','STR','btbBravePointsFull','makeAdditionalSkillCostText','Game_BattlerBase_appear','ARRAYJSON','createGraphicSprite','actor','%1SystemBg','kduVu','jqmQV','constructor','TurnOrderBTBGraphicType','BattleSystemBTB','_windowLayer','svBattlerName','clearActions','HOXzo','canProcessActionFusionsBTB','SpriteLength','Window_BattleStatus_drawItemStatusListStyle','removeActor','loadSvEnemy','Settings','ARRAYSTRUCT','enemy','_actorCommandWindow','setSkill','QOaYe','makeCommandList','uVBPD','maxBravePoints','round','EnableFusion','ShowCommand','updateTurnOrder','uGuuv','RepositionTopHelpX','gradientFillRect','ItemScene','_weapons','reduceBrave','HNVGZ','TurnOrderBTBGraphicFaceName','\x5cI[%1]%2','%1_align','index','clamp','_homeDuration','registerCommand','applyItemUserEffect','itemRect','Window_Selectable_cursorPagedown','BattleManager_isActiveTpb','Skill-%1-%2','CannotFusion','currentAction','MsnMC','indexOf','BTB_MAX_BRAVEPOINTS_HARD_CAP','inputtingAction','_items','width','isTpb','vQSWk','Fencb','ceil','BravePointCostFmt','vCyBN','cancelBrave','NLlaF','modifyBTBActionCounterSprite_Fallback','Game_BattlerBase_canUse','JsBravePointsTarget','Window_Help_setItem','remove','clear','process_VisuMZ_BattleSystemBTB_JS','_btbActionSprite','BnUHp','Show_1_BP_Cost','Game_Action_setItem','bitmapHeight','refreshStatusBTB','ScreenBuffer','General','BravePointSetTarget','scnQY','isItem','requestFauxAnimation','createActorCommandWindow','ARRAYSTR','MinBravePoints','canGuard','createBTBTurnOrderWindow','_fullHeight','createActorCommandWindowBTB','_fadeDuration','ShowFacesListStyle','ShowCostForAttack','getActionFusionRecipeItems','BTB_MIN_BRAVEPOINTS_HARD_CAP','ShowMarkerBg','NUM','Game_Enemy_makeActions','xXYTF','btbPaySkillFusionCosts','UpdateFrames','applyBattleItemWindowBTB','BattleManager_isTurnBased','note','IconSet','BravePointAlterTarget','payBravePointsCost','iconWidth','updateHomePosition','resetFontSettings','_itemIDs','WOypd','FTEVm','FTJaA','caVUk','makeSpeed','bravePointsCost','LMUuW','%1Mirror','EnemyMultiAction','CostPosition','right','rpDBn','itemRectPortraitBTB','Window_BattleStatus_drawItemStatusXPStyle','format','BravePointItemCost','_btbTurnOrderFaceIndex','destroyBTBActionCounters','substring','max','_targetHomeX','NeutralColor','RegExp','Game_System_initialize','hideBraveTrait','BravePointAlterUser','join','_logWindow','_targetIndex','btbActionCurrent','isActiveTpb','_graphicType','createTurnOrderBTBGraphicType','xadQT','Game_Party_removeActor','startFade','makeAdditionalCostTextBTB','BTB_MIN_BRAVEPOINTS_DEFAULT','createKeyJS','_graphicSprite','isBTB','JkfFq','maxBraveActions','_actions','CenterHorz','uqqtT','makeActions','applyItemBattleSystemBTBUserEffect','_graphicHue','waitCount','hasSvBattler','_isBattleOver','_actor','splice','Item-%1-%2','BraveAnimation','guardSkillId','mLGZC','process_VisuMZ_BattleSystemBTB_Notetags','_graphicIconIndex','updateSelectionEffect','nLevu','mpOBw','_btbTurnOrderGraphicType','isUsePageUpDnShortcutBTB','_btbTurnOrderWindow','itemLineRect','Actor','_position','showBraveAnimationBTB','VYMMm','TurnOrderBTBGraphicIconIndex','Window_Selectable_select','blt','crmsh','vaNYS','btbActionSlot','KQlJJ','ParseItemNotetags','commandCancel','FaceIndex','gainBravePoints','Armor-%1-%2','_backgroundSprite','drawActorBravePoints','eoYJk','_graphicEnemy','ActionSlot','ItemQuantityFmt','ShowMarkerBorder','\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Declare\x20Variables\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20arguments[0];\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20arguments[1];\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20value\x20=\x20arguments[2];\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Process\x20Code\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Return\x20Value\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x20value;\x0a\x20\x20\x20\x20\x20\x20\x20\x20','lMSAD','Mehiv','Game_Battler_onTurnEnd','SpEaV','QawvJ','speed','aKSNL','modifyBTBActionCounterSprite','BravePointStartFavor','svActorVertCells','20hvIvBn','CancelAnimationID','textSizeEx','\x5cC[%1]%2\x5cC[0]','setItem','addBraveCommand','MaxHorzSprites','createLetterSprite','_isAlive','_actionInputIndex','createBattlerSprites','isHorz','_letter','trim','wsszB','yCwdD','_btbItemFlexFusion','isAlive','MaxActionsHardCap','_btbTurnOrderFaceName','addLoadListener','shift','showNormalAnimation','Window_Base_close','Game_BattlerBase_canGuard','members','some','_positionTargetX','btbBravePointsIcon','ActorBattlerIcon','btbPayItemFusionCosts','agkDI','ShowCostForGuard','LAlph','create','Actors','updateOpacity','removeActionBattlersBTB','initBattleSystemBTB','minBravePoints','checkOpacity','MaxVertSprites','WRJrQ','ARRAYEVAL','makeActionOrders','%1BgColor1','_actionFusionRecipe','ACaqL','initialize','pBfAm','boxHeight','floor','createTurnOrderBTBGraphicFaceIndex','Enemy','QzAtz','BTB_MAX_BRAVEPOINTS_DEFAULT','gZULR','braveAnimationTimes','updateGraphic','isTurnBased','_graphicSv','JsBravePointsUser','_statusWindow','onDisabledPartyCommandSelection','16bENzDe','%1AnimationID','calculateTargetPositions','BravePointSkillCost','GcasO','Actor-%1-%2','BravePointsAbbr','addCommand','Window_Base_drawItemNumber','battler','CzQVy','canBrave','_ogWindowLayerX','JpiSJ','isBattleItemWindowBTB','_skillIDs','1451765JhOnoQ','ActorActionFusions','recalculateHome','_isAppeared','SpriteThin','guard','xXvKo','TurnOrderBTBGraphicFaceIndex','veUMO','_graphicFaceIndex','29740mGjhzX','ParseSkillNotetags','createBattlerRect','ncyUu','EnemyBattlerFontSize','Game_Actor_makeActions','clearTurnOrderBTBGraphics','_scene','ItemsEquipsCore','BravePointBattleStart','_bravePoints','_armors','updateLetter','faceWidth','makeDeepCopy','%1\x20%2\x20%3','setHandler','ParseAllNotetags','EMLsf','svActorHorzCells','\x5cI[%1]','createBackgroundSprite','Scene_Battle_createAllWindows','pYsfl','attack','updateTurnOrderBTB','_btbTurnOrderIconIndex','getSkillIdWithName','RepositionTopHelpY','%1BgColor2','Window','AKISk','active','update','jQOUL','isAppeared','634239Dteher','HideBrave','DisplayPosition','regenerateBravePoints','return\x200','opacity','pop','Game_Unit_makeActions','removeActionFusionIngredients','BtbTurnOrderActorFace','onBattleStart','isSkill','version','needsSelection','processActionFusionsBTB','oxIdr','startTurn','changeSvActorGraphicBitmap','zgjWl','VZYMG','useItem','setHue','BTB','CGWsj','createChildren','BravePointCost','parse','height','BtbTurnOrderEnemyFace','Game_Action_speed','tIChe','_positionDuration','DisplayOffsetX','AllowRandomSpeed','face','_guardUnleash','%1-%2','name','BattleManager_startAction','ShowEnemyBrave','selectNextCommand','Mechanics','MaxActions','WaitFrames','Window_BattleLog_startAction','LQtwi','addChild','_ogWindowLayerY','showBravePoints','svactor','isEnemy','setBlendColor','startInput','UuafG','ZmDCJ','isSceneBattle','BattleManager_makeActionOrders','BtbTurnOrderEnemyIcon','_positionTargetY','performBrave','RXnBv','eidwh','lhTwp','rrXAt','hbfUF','bravePoints','JcEUn','TurnOrder','canUse','removeChild','CannotBrave','EnemyActionFusions','VsCTF','getOffsetY_BTB','split','min','slice','loadSvActor','Cwzja','Window_Selectable_cursorPageup','_turnOrderContainer','windowRect','BattleManager_startInput','BravePointSetUser','btbBraveCommand','_plural','_btbSkillStrictFusion','State-%1-%2','BtbTurnOrderClearActorGraphic','BravePointRegen','setBravePoints','description','onDatabaseLoaded','_fadeTarget','_containerWidth','getChildIndex','bind','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','item','Obqsl','updatePosition','bottom','containerWindow','cursorPagedown','_graphicFaceName','getActionFusionRecipeSkills','status','skillCostSeparator','sortActionOrdersBTB','processUpdateGraphic','DWLrK','EnemyBattlerFaceIndex','Game_Battler_performCollapse','onTurnEndBTB','addChildAt','%1_display','drawItemStatusXPStyle','compareBattlerSprites','EnemyBattlerDrawLetter','hide','updateVisibility','_targetHomeY','allowRandomSpeed','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','match','%1SystemBorder','BraveAnimationID','repeat','MaxBravePoints','ConvertParams','Enemies','performCollapse','createBTBActionCounters','HideBravePointCost','_btbTurnOrderVisible','qNlrg','appear','getOffsetX_BTB','BattleManager_battleSys','top','BOFcC','isInputting','_containerHeight','_unit','LkKYH','BattleManager_isTpb','test','numActions','WtGuw','setup','KLSxC','VRlLl','ItemQuantityFontSize','pCqQd','loadSystem','createTurnOrderBTBGraphicFaceName','Game_Battler_onBattleStart','canPayActionFusionCombination','cannotBraveTrait','_turnOrderInnerSprite','BravePointsFull','loadFace','eMrgG','process_VisuMZ_BattleSystemBTB','queueBraveAnimationsBTB','BtbTurnOrderClearEnemyGraphic','fontFace','%1Mute','Cfudn','FFzyn','useItemBTB','jRTLD','battleEnd','_blendColor','jGVJm','Game_BattlerBase_hide','STRUCT','olOZf','EnemyBattlerFontFace','vKrMa','loadEnemy','makeActionTimes','attackSkillId','createInitialPositions','BattleLayout','cancel','_letterSprite','select','isBattleSystemBTBTurnOrderVisible','eVFHC','_index','Game_BattlerBase_canInput','battlerHue','zcGPU','PGmCk','abbcp','clearRect','IconIndex','defaultPosition','text','predictedBravePoints','Enemy-%1-%2','left','_scrollY','btbMatchesCurrentFusionAction','requestRefresh','519938NlKNJu','waitForAnimation','_fullWidth','faceName','Visible','bitmap','NbzSq','ZnviX','_actionBattlers','Game_Battler_makeActionTimes','meGAI','checkActionsBTB','FusionFlex','cannotFusionNotetagBTB','battleSys','loseBravePoints','Window_ActorCommand_addGuardCommand','1431576fwavrI','getColor','MinBravePointsDefault','EnemyBattlerFaceName','Window_Base_makeAdditionalSkillCostText','calcRegenBravePoints','ActorBattlerType','_homeY','length','mainSprite','syTDo','drawItemNumber','map','prototype','onTurnEnd','_bypassAiValidCheck','push','FusionStrict','anchor','RepositionTopForHelp','_braveStartupAnimation','drawItemStatusListStyle','filter','setBattleSystemBTBTurnOrderVisible','MinBravePointsHardCap','fontSize','_helpWindow','BravePointPredictedCost','applyBattleSystemBTBUserEffect','numItems','SVuBU','currentSymbol','FaceName','_btbSkillFlexFusion','currentExt','toUpperCase','jxvSo','sort','IionT','checkTargetPositions','%1BorderColor','exit','getItemIdWithName','updateBattleContainerOrder','createTestBitmap','StatusDisplayFmt','btbParseFusionData','RepositionLogWindow','NegativeColor','BorderThickness','PositiveColor','maxBattleMembers','Parse_Notetags_BravePointsUserJS','commandStyle','oqbSD','subject','children','center','EVAL','traitObjects','battlerName','commandCancelBTB','createAllWindows','faceIndex','yxNKL','boxWidth','SystemTurnOrderVisibility','OAqfN','drawText','isActor','mFjAv','EnemyBattlerIcon','_tempBattler','Game_Action_allowRandomSpeed','startAction','predictedBravePointCost','btbBravePointsAbbr','JSON','canInput','canActionFusionWithBTB','dSpOe','sZxXA'];_0x3e50=function(){return _0x42f9bc;};return _0x3e50();}function _0x5849(_0x11a9f5,_0x5e5178){const _0x3e50c1=_0x3e50();return _0x5849=function(_0x5849a5,_0x4e57fb){_0x5849a5=_0x5849a5-0x10d;let _0x53743e=_0x3e50c1[_0x5849a5];return _0x53743e;},_0x5849(_0x11a9f5,_0x5e5178);}var label=_0x2beff5(0x39a),tier=tier||0x0,dependencies=[],pluginData=$plugins[_0x2beff5(0x307)](function(_0x1b4c38){const _0x497466=_0x2beff5;return _0x1b4c38[_0x497466(0x27c)]&&_0x1b4c38['description'][_0x497466(0x359)]('['+label+']');})[0x0];VisuMZ[label][_0x2beff5(0x3a4)]=VisuMZ[label]['Settings']||{},VisuMZ[_0x2beff5(0x293)]=function(_0xf5f970,_0x3b0af9){const _0x321279=_0x2beff5;for(const _0x31bcb2 in _0x3b0af9){if(_0x321279(0x122)===_0x321279(0x122)){if(_0x31bcb2[_0x321279(0x28e)](/(.*):(.*)/i)){if('hFeXj'===_0x321279(0x396))this['_ogWindowLayerX']=_0xe50512[_0x321279(0x3ad)]((_0x5544ae[_0x321279(0x3cb)]-_0x12311a[_0x321279(0x25d)](_0x9dd1e3['boxWidth'],_0xeb4fde[_0x321279(0x3cb)]))/0x2),this[_0x321279(0x241)]=_0x4eaf92[_0x321279(0x3ad)]((_0x2cc2f8[_0x321279(0x22d)]-_0x23c603[_0x321279(0x25d)](_0x270247[_0x321279(0x1c6)],_0xd0a3de[_0x321279(0x22d)]))/0x2);else{const _0x3c8c20=String(RegExp['$1']),_0x5a16d3=String(RegExp['$2'])['toUpperCase']()['trim']();let _0x4fe5f5,_0x1d52d1,_0x361123;switch(_0x5a16d3){case _0x321279(0x120):_0x4fe5f5=_0x3b0af9[_0x31bcb2]!==''?Number(_0x3b0af9[_0x31bcb2]):0x0;break;case'ARRAYNUM':_0x1d52d1=_0x3b0af9[_0x31bcb2]!==''?JSON['parse'](_0x3b0af9[_0x31bcb2]):[],_0x4fe5f5=_0x1d52d1[_0x321279(0x2fd)](_0x3a1a16=>Number(_0x3a1a16));break;case _0x321279(0x32b):_0x4fe5f5=_0x3b0af9[_0x31bcb2]!==''?eval(_0x3b0af9[_0x31bcb2]):null;break;case _0x321279(0x1bf):_0x1d52d1=_0x3b0af9[_0x31bcb2]!==''?JSON[_0x321279(0x22c)](_0x3b0af9[_0x31bcb2]):[],_0x4fe5f5=_0x1d52d1[_0x321279(0x2fd)](_0xedf1e0=>eval(_0xedf1e0));break;case _0x321279(0x33e):_0x4fe5f5=_0x3b0af9[_0x31bcb2]!==''?JSON[_0x321279(0x22c)](_0x3b0af9[_0x31bcb2]):'';break;case _0x321279(0x392):_0x1d52d1=_0x3b0af9[_0x31bcb2]!==''?JSON[_0x321279(0x22c)](_0x3b0af9[_0x31bcb2]):[],_0x4fe5f5=_0x1d52d1[_0x321279(0x2fd)](_0x17610d=>JSON[_0x321279(0x22c)](_0x17610d));break;case'FUNC':_0x4fe5f5=_0x3b0af9[_0x31bcb2]!==''?new Function(JSON[_0x321279(0x22c)](_0x3b0af9[_0x31bcb2])):new Function(_0x321279(0x216));break;case'ARRAYFUNC':_0x1d52d1=_0x3b0af9[_0x31bcb2]!==''?JSON[_0x321279(0x22c)](_0x3b0af9[_0x31bcb2]):[],_0x4fe5f5=_0x1d52d1[_0x321279(0x2fd)](_0x5570a2=>new Function(JSON[_0x321279(0x22c)](_0x5570a2)));break;case _0x321279(0x38e):_0x4fe5f5=_0x3b0af9[_0x31bcb2]!==''?String(_0x3b0af9[_0x31bcb2]):'';break;case _0x321279(0x114):_0x1d52d1=_0x3b0af9[_0x31bcb2]!==''?JSON[_0x321279(0x22c)](_0x3b0af9[_0x31bcb2]):[],_0x4fe5f5=_0x1d52d1[_0x321279(0x2fd)](_0x154857=>String(_0x154857));break;case _0x321279(0x2c2):_0x361123=_0x3b0af9[_0x31bcb2]!==''?JSON[_0x321279(0x22c)](_0x3b0af9[_0x31bcb2]):{},_0x4fe5f5=VisuMZ[_0x321279(0x293)]({},_0x361123);break;case _0x321279(0x3a5):_0x1d52d1=_0x3b0af9[_0x31bcb2]!==''?JSON['parse'](_0x3b0af9[_0x31bcb2]):[],_0x4fe5f5=_0x1d52d1[_0x321279(0x2fd)](_0x483172=>VisuMZ[_0x321279(0x293)]({},JSON[_0x321279(0x22c)](_0x483172)));break;default:continue;}_0xf5f970[_0x3c8c20]=_0x4fe5f5;}}}else _0x455c10[_0x321279(0x301)](_0x595857(_0x30291f));}return _0xf5f970;},(_0xef2aad=>{const _0x4caf6c=_0x2beff5,_0x1734e1=_0xef2aad[_0x4caf6c(0x237)];for(const _0x5a482f of dependencies){if(_0x4caf6c(0x1f1)==='ncyUu'){if(!Imported[_0x5a482f]){alert('%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.'['format'](_0x1734e1,_0x5a482f)),SceneManager[_0x4caf6c(0x31a)]();break;}}else{if(!_0x2f875e['isBTB']())return;this[_0x4caf6c(0x170)]=new _0x311e0f();const _0x3cf287=this[_0x4caf6c(0x271)](this[_0x4caf6c(0x39b)]);this[_0x4caf6c(0x284)](this[_0x4caf6c(0x170)],_0x3cf287),this[_0x4caf6c(0x361)](),_0x32c4fe['updateTurnOrderBTB'](!![]);}}const _0x162bd0=_0xef2aad[_0x4caf6c(0x26d)];if(_0x162bd0[_0x4caf6c(0x28e)](/\[Version[ ](.*?)\]/i)){if(_0x4caf6c(0x17c)===_0x4caf6c(0x24f))return _0x2da04a(_0x3b8603['$1']);else{const _0x60bf53=Number(RegExp['$1']);if(_0x60bf53!==VisuMZ[label][_0x4caf6c(0x21e)]){if(_0x4caf6c(0x16c)!==_0x4caf6c(0x16c)){const _0x4365f4=_0x3bf71c['BattleSystemBTB'][_0x4caf6c(0x145)],_0x2d20ca=_0x4365f4['CannotBrave'];return this['traitObjects']()[_0x4caf6c(0x1ae)](_0x45a3f0=>_0x45a3f0&&_0x45a3f0[_0x4caf6c(0x127)][_0x4caf6c(0x28e)](_0x2d20ca));}else alert(_0x4caf6c(0x28d)[_0x4caf6c(0x13d)](_0x1734e1,_0x60bf53)),SceneManager[_0x4caf6c(0x31a)]();}}}if(_0x162bd0[_0x4caf6c(0x28e)](/\[Tier[ ](\d+)\]/i)){if(_0x4caf6c(0x3b1)===_0x4caf6c(0x3b1)){const _0x466d96=Number(RegExp['$1']);_0x466d96<tier?(alert(_0x4caf6c(0x273)[_0x4caf6c(0x13d)](_0x1734e1,_0x466d96,tier)),SceneManager[_0x4caf6c(0x31a)]()):'fQnZm'!=='InZVV'?tier=Math[_0x4caf6c(0x142)](_0x466d96,tier):this[_0x4caf6c(0x24c)]=_0x58105d?0x0:_0x684abc[_0x4caf6c(0x22d)]-this[_0x4caf6c(0x24c)]-_0x51bf74[_0x4caf6c(0x1e8)];}else return![];}VisuMZ['ConvertParams'](VisuMZ[label]['Settings'],_0xef2aad[_0x4caf6c(0x35a)]);})(pluginData),PluginManager[_0x2beff5(0x3be)](pluginData[_0x2beff5(0x237)],'BtbTurnOrderActorIcon',_0x4f9f93=>{const _0x346b40=_0x2beff5;VisuMZ[_0x346b40(0x293)](_0x4f9f93,_0x4f9f93);const _0x1c1e98=_0x4f9f93[_0x346b40(0x1b7)],_0x5d5bc8=_0x4f9f93[_0x346b40(0x2d7)];for(const _0x5cf5e2 of _0x1c1e98){const _0x3a1a33=$gameActors[_0x346b40(0x394)](_0x5cf5e2);if(!_0x3a1a33)continue;_0x3a1a33['_btbTurnOrderGraphicType']=_0x346b40(0x34e),_0x3a1a33[_0x346b40(0x208)]=_0x5d5bc8;}}),PluginManager[_0x2beff5(0x3be)](pluginData[_0x2beff5(0x237)],_0x2beff5(0x21b),_0x2c243c=>{const _0x4fb6f8=_0x2beff5;VisuMZ[_0x4fb6f8(0x293)](_0x2c243c,_0x2c243c);const _0x4de7da=_0x2c243c[_0x4fb6f8(0x1b7)],_0x1c45b5=_0x2c243c[_0x4fb6f8(0x311)],_0x2fb19e=_0x2c243c[_0x4fb6f8(0x17f)];for(const _0x1ed062 of _0x4de7da){const _0x335f25=$gameActors[_0x4fb6f8(0x394)](_0x1ed062);if(!_0x335f25)continue;_0x335f25['_btbTurnOrderGraphicType']=_0x4fb6f8(0x234),_0x335f25[_0x4fb6f8(0x1a7)]=_0x1c45b5,_0x335f25[_0x4fb6f8(0x13f)]=_0x2fb19e;}}),PluginManager[_0x2beff5(0x3be)](pluginData[_0x2beff5(0x237)],_0x2beff5(0x26a),_0x2aab19=>{const _0x4bd683=_0x2beff5;VisuMZ[_0x4bd683(0x293)](_0x2aab19,_0x2aab19);const _0x31da25=_0x2aab19['Actors'];for(const _0x4b4823 of _0x31da25){const _0x5408c5=$gameActors[_0x4bd683(0x394)](_0x4b4823);if(!_0x5408c5)continue;_0x5408c5[_0x4bd683(0x1f4)]();}}),PluginManager[_0x2beff5(0x3be)](pluginData[_0x2beff5(0x237)],_0x2beff5(0x24b),_0x150a8e=>{const _0x225967=_0x2beff5;VisuMZ['ConvertParams'](_0x150a8e,_0x150a8e);const _0x192acf=_0x150a8e[_0x225967(0x294)],_0x4f86ef=_0x150a8e[_0x225967(0x2d7)];for(const _0x55e842 of _0x192acf){if('AJhFp'!==_0x225967(0x342)){const _0x13696e=$gameTroop[_0x225967(0x1ad)]()[_0x55e842];if(!_0x13696e)continue;_0x13696e[_0x225967(0x16e)]=_0x225967(0x34e),_0x13696e[_0x225967(0x208)]=_0x4f86ef;}else{const _0x89b786=this[_0x225967(0x3bd)];this[_0x225967(0x346)]=(this[_0x225967(0x346)]*(_0x89b786-0x1)+this[_0x225967(0x143)])/_0x89b786,this[_0x225967(0x2f8)]=(this['_homeY']*(_0x89b786-0x1)+this[_0x225967(0x28b)])/_0x89b786,this[_0x225967(0x3bd)]--,this[_0x225967(0x3bd)]<=0x0&&(this[_0x225967(0x346)]=this['_targetHomeX'],this[_0x225967(0x2f8)]=this[_0x225967(0x28b)]);}}}),PluginManager[_0x2beff5(0x3be)](pluginData[_0x2beff5(0x237)],_0x2beff5(0x22e),_0x56f4b2=>{const _0x48ec61=_0x2beff5;VisuMZ[_0x48ec61(0x293)](_0x56f4b2,_0x56f4b2);const _0x30e201=_0x56f4b2[_0x48ec61(0x294)],_0x5e144d=_0x56f4b2[_0x48ec61(0x311)],_0x24450f=_0x56f4b2[_0x48ec61(0x17f)];for(const _0x20835f of _0x30e201){if(_0x48ec61(0x3dc)!=='BnUHp'){if(_0x518c63[_0x48ec61(0x28e)](_0x2d0657['BravePointSetTarget'])){const _0x1cb0ec=_0x905cad(_0x3fe850['$1']);_0x186e51[_0x48ec61(0x26c)](_0x1cb0ec);}if(_0x1df430[_0x48ec61(0x28e)](_0x1267b0[_0x48ec61(0x129)])){const _0x273980=_0x30f632(_0x1e494d['$1']);_0x41c9e0[_0x48ec61(0x180)](_0x273980);}const _0x63868f=_0x48ec61(0x3d6),_0x37b173=_0x5a05b7['BattleSystemBTB'][_0x48ec61(0x155)](_0xa6873d,_0x63868f);if(_0x46aae5[_0x48ec61(0x39a)]['JS'][_0x37b173]){const _0x4a0fdb=_0x360168['BattleSystemBTB']['JS'][_0x37b173][_0x48ec61(0x354)](this,this[_0x48ec61(0x328)](),_0x55e122,_0x42162f[_0x48ec61(0x253)]());_0x43f767[_0x48ec61(0x26c)](_0x4a0fdb);}}else{const _0x28bd15=$gameTroop[_0x48ec61(0x1ad)]()[_0x20835f];if(!_0x28bd15)continue;_0x28bd15['_btbTurnOrderGraphicType']=_0x48ec61(0x234),_0x28bd15[_0x48ec61(0x1a7)]=_0x5e144d,_0x28bd15[_0x48ec61(0x13f)]=_0x24450f;}}}),PluginManager[_0x2beff5(0x3be)](pluginData[_0x2beff5(0x237)],_0x2beff5(0x2b7),_0xc1d1ea=>{const _0x393b3e=_0x2beff5;VisuMZ[_0x393b3e(0x293)](_0xc1d1ea,_0xc1d1ea);const _0x4d8e81=_0xc1d1ea['Enemies'];for(const _0x37ddca of _0x4d8e81){const _0x191d5d=$gameTroop[_0x393b3e(0x1ad)]()[_0x37ddca];if(!_0x191d5d)continue;_0x191d5d[_0x393b3e(0x1f4)]();}}),PluginManager[_0x2beff5(0x3be)](pluginData[_0x2beff5(0x237)],_0x2beff5(0x333),_0x41ce62=>{const _0x144355=_0x2beff5;VisuMZ[_0x144355(0x293)](_0x41ce62,_0x41ce62);const _0x23f621=_0x41ce62[_0x144355(0x2e4)];$gameSystem[_0x144355(0x308)](_0x23f621);}),VisuMZ['BattleSystemBTB']['RegExp']={'EnemyMultiAction':/<BTB (?:MULTI|MULTIPLE) (?:ACTION|ACTIONS):[ ](.*)>/i,'BravePointCost':/<BTB (?:BRAVE|BP) COST:[ ](\d+)>/i,'BravePointSetUser':/<BTB USER SET (?:BRAVE|BP):[ ](\d+)>/i,'BravePointSetTarget':/<BTB TARGET SET (?:BRAVE|BP):[ ](\d+)>/i,'BravePointAlterUser':/<BTB USER (?:GAIN|LOSE) (?:BRAVE|BP):[ ]([\+\-]\d+)>/i,'BravePointAlterTarget':/<BTB TARGET (?:GAIN|LOSE) (?:BRAVE|BP):[ ]([\+\-]\d+)>/i,'HideBravePointCost':/<BTB HIDE (?:BRAVE|BP) COST>/i,'BTB_Help':/<BTB HELP>\s*([\s\S]*)\s*<\/BTB HELP>/i,'FusionFlex':/<BTB (?:FLEX|FLEXIBLE) FUSION:[ ](.*)>/gi,'FusionStrict':/<BTB (?:STRICT|EXACT) FUSION:[ ](.*)>/gi,'JsBravePointsUser':/<JS BTB USER (?:BRAVE|BP)>\s*([\s\S]*)\s*<\/JS BTB USER (?:BRAVE|BP)>/i,'JsBravePointsTarget':/<JS BTB TARGET (?:BRAVE|BP)>\s*([\s\S]*)\s*<\/JS BTB TARGET (?:BRAVE|BP)>/i,'BravePointBattleStart':/<BTB INITIAL (?:BRAVE|BP):[ ]([\+\-]\d+)>/i,'BravePointRegen':/<BTB (?:BRAVE|BP) (?:REGEN|DEGEN):[ ]([\+\-]\d+)>/i,'MaxBravePoints':/<BTB (?:MAXIMUM|MAX) (?:BRAVE|BP):[ ]([\+\-]\d+)>/i,'MinBravePoints':/<BTB (?:MINIMUM|MIN) (?:BRAVE|BP):[ ]([\+\-]\d+)>/i,'MaxActions':/<BTB (?:MAXIMUM|MAX) (?:ACTION|ACTIONS):[ ]([\+\-]\d+)>/i,'CannotBrave':/<BTB CANNOT BRAVE>/i,'HideBrave':/<BTB HIDE BRAVE>/i,'CannotFusion':/<BTB CANNOT FUSION>/i,'EnableFusion':/<BTB ENABLE FUSION>/i},VisuMZ['BattleSystemBTB']['Scene_Boot_onDatabaseLoaded']=Scene_Boot[_0x2beff5(0x2fe)][_0x2beff5(0x26e)],Scene_Boot[_0x2beff5(0x2fe)][_0x2beff5(0x26e)]=function(){const _0x561170=_0x2beff5;VisuMZ[_0x561170(0x39a)][_0x561170(0x380)][_0x561170(0x354)](this),this['process_VisuMZ_BattleSystemBTB']();},Scene_Boot[_0x2beff5(0x2fe)][_0x2beff5(0x2b5)]=function(){const _0x5b05fc=_0x2beff5;this['process_VisuMZ_BattleSystemBTB_Notetags'](),this[_0x5b05fc(0x3da)]();},Scene_Boot[_0x2beff5(0x2fe)][_0x2beff5(0x169)]=function(){const _0x49b496=_0x2beff5;if(VisuMZ[_0x49b496(0x1ff)])return;const _0x1b13ee=$dataSkills[_0x49b496(0x363)]($dataItems);for(const _0x53813b of _0x1b13ee){if(_0x49b496(0x20d)===_0x49b496(0x24e))this[_0x49b496(0x3bd)]=_0x109f36['UpdateFrames'];else{if(!_0x53813b)continue;DataManager[_0x49b496(0x382)](_0x53813b);}}},VisuMZ[_0x2beff5(0x39a)]['JS']={},Scene_Boot[_0x2beff5(0x2fe)][_0x2beff5(0x3da)]=function(){const _0x1999b0=_0x2beff5;if(VisuMZ[_0x1999b0(0x1ff)])return;const _0xc75f34=VisuMZ[_0x1999b0(0x39a)][_0x1999b0(0x145)],_0x4e0765=$dataSkills[_0x1999b0(0x363)](dataItems);for(const _0x4b84a4 of _0x4e0765){if(!_0x4b84a4)continue;VisuMZ[_0x1999b0(0x39a)]['Parse_Notetags_BravePointsUserJS'](_0x4b84a4,'JsBravePointsUser'),VisuMZ[_0x1999b0(0x39a)][_0x1999b0(0x325)](_0x4b84a4,_0x1999b0(0x3d6));}},VisuMZ[_0x2beff5(0x39a)][_0x2beff5(0x325)]=function(_0x1a8b15,_0x215a2d){const _0x2dd30d=_0x2beff5,_0x1e688e=VisuMZ[_0x2dd30d(0x39a)][_0x2dd30d(0x145)][_0x215a2d],_0x2fca6a=_0x1a8b15['note'];if(_0x2fca6a['match'](_0x1e688e)){if(_0x2dd30d(0x25a)!=='wQTfc'){const _0x19d7d3=String(RegExp['$1']),_0x3a56dc=_0x2dd30d(0x189)[_0x2dd30d(0x13d)](_0x19d7d3),_0x5bf094=VisuMZ[_0x2dd30d(0x39a)][_0x2dd30d(0x155)](_0x1a8b15,_0x215a2d);VisuMZ['BattleSystemBTB']['JS'][_0x5bf094]=new Function(_0x3a56dc);}else delete this['_btbTurnOrderGraphicType'],delete this[_0x2dd30d(0x1a7)],delete this[_0x2dd30d(0x13f)],delete this[_0x2dd30d(0x208)];}},VisuMZ['BattleSystemBTB'][_0x2beff5(0x155)]=function(_0x41c523,_0x3a80bf){const _0x49a990=_0x2beff5;if(VisuMZ[_0x49a990(0x155)])return VisuMZ[_0x49a990(0x155)](_0x41c523,_0x3a80bf);let _0x471325='';if($dataActors[_0x49a990(0x359)](_0x41c523))_0x471325=_0x49a990(0x1d9)[_0x49a990(0x13d)](_0x41c523['id'],_0x3a80bf);if($dataClasses[_0x49a990(0x359)](_0x41c523))_0x471325='Class-%1-%2'[_0x49a990(0x13d)](_0x41c523['id'],_0x3a80bf);if($dataSkills['includes'](_0x41c523))_0x471325=_0x49a990(0x3c3)['format'](_0x41c523['id'],_0x3a80bf);if($dataItems[_0x49a990(0x359)](_0x41c523))_0x471325=_0x49a990(0x165)[_0x49a990(0x13d)](_0x41c523['id'],_0x3a80bf);if($dataWeapons[_0x49a990(0x359)](_0x41c523))_0x471325='Weapon-%1-%2'[_0x49a990(0x13d)](_0x41c523['id'],_0x3a80bf);if($dataArmors[_0x49a990(0x359)](_0x41c523))_0x471325=_0x49a990(0x181)[_0x49a990(0x13d)](_0x41c523['id'],_0x3a80bf);if($dataEnemies['includes'](_0x41c523))_0x471325=_0x49a990(0x2db)[_0x49a990(0x13d)](_0x41c523['id'],_0x3a80bf);if($dataStates[_0x49a990(0x359)](_0x41c523))_0x471325=_0x49a990(0x269)['format'](_0x41c523['id'],_0x3a80bf);return _0x471325;},VisuMZ[_0x2beff5(0x39a)][_0x2beff5(0x1ef)]=VisuMZ[_0x2beff5(0x1ef)],VisuMZ['ParseSkillNotetags']=function(_0x284452){const _0x1bb62e=_0x2beff5;VisuMZ[_0x1bb62e(0x39a)]['ParseSkillNotetags'][_0x1bb62e(0x354)](this,_0x284452),DataManager['btbRegisterFusions'](_0x284452),VisuMZ[_0x1bb62e(0x39a)]['Parse_Notetags_BravePointsUserJS'](_0x284452,_0x1bb62e(0x1d1)),VisuMZ[_0x1bb62e(0x39a)][_0x1bb62e(0x325)](_0x284452,_0x1bb62e(0x3d6));},VisuMZ[_0x2beff5(0x39a)][_0x2beff5(0x17d)]=VisuMZ['ParseItemNotetags'],VisuMZ['ParseItemNotetags']=function(_0x32effd){const _0xa83ff3=_0x2beff5;VisuMZ[_0xa83ff3(0x39a)][_0xa83ff3(0x17d)]['call'](this,_0x32effd),DataManager[_0xa83ff3(0x382)](_0x32effd),VisuMZ[_0xa83ff3(0x39a)][_0xa83ff3(0x325)](_0x32effd,'JsBravePointsUser'),VisuMZ[_0xa83ff3(0x39a)][_0xa83ff3(0x325)](_0x32effd,_0xa83ff3(0x3d6));},DataManager['getSkillIdWithName']=function(_0x1edcc3){const _0x4dafb8=_0x2beff5;_0x1edcc3=_0x1edcc3[_0x4dafb8(0x314)]()[_0x4dafb8(0x1a1)](),this[_0x4dafb8(0x1e3)]=this[_0x4dafb8(0x1e3)]||{};if(this['_skillIDs'][_0x1edcc3])return this[_0x4dafb8(0x1e3)][_0x1edcc3];for(const _0x20446f of $dataSkills){if(_0x4dafb8(0x2a2)==='LkKYH'){if(!_0x20446f)continue;this['_skillIDs'][_0x20446f['name'][_0x4dafb8(0x314)]()[_0x4dafb8(0x1a1)]()]=_0x20446f['id'];}else{if(!this[_0x4dafb8(0x2b1)])return;const _0x4b5ee5=this[_0x4dafb8(0x2b1)]['children'];if(!_0x4b5ee5)return;_0x4b5ee5[_0x4dafb8(0x316)](this[_0x4dafb8(0x287)][_0x4dafb8(0x272)](this));}}return this[_0x4dafb8(0x1e3)][_0x1edcc3]||0x0;},DataManager['getItemIdWithName']=function(_0x2b4cd3){const _0xeaebb4=_0x2beff5;_0x2b4cd3=_0x2b4cd3[_0xeaebb4(0x314)]()['trim'](),this[_0xeaebb4(0x12e)]=this[_0xeaebb4(0x12e)]||{};if(this[_0xeaebb4(0x12e)][_0x2b4cd3])return this['_itemIDs'][_0x2b4cd3];for(const _0x5ae2ea of $dataItems){if(!_0x5ae2ea)continue;this['_itemIDs'][_0x5ae2ea[_0xeaebb4(0x237)][_0xeaebb4(0x314)]()['trim']()]=_0x5ae2ea['id'];}return this['_itemIDs'][_0x2b4cd3]||0x0;},DataManager[_0x2beff5(0x312)]={},DataManager[_0x2beff5(0x268)]={},DataManager['_btbItemFlexFusion']={},DataManager[_0x2beff5(0x362)]={},DataManager[_0x2beff5(0x382)]=function(_0x6fcd51){const _0x3aa3b1=_0x2beff5;if(!_0x6fcd51)return;const _0x5ddfbe=VisuMZ[_0x3aa3b1(0x39a)][_0x3aa3b1(0x145)],_0x253301=_0x6fcd51[_0x3aa3b1(0x127)],_0x505e0c=DataManager[_0x3aa3b1(0x21d)](_0x6fcd51),_0x444695=_0x253301['match'](_0x5ddfbe['FusionFlex']);if(_0x444695){if('iwevP'==='TmUDR')this['addBraveCommand'](),_0x457073[_0x3aa3b1(0x39a)][_0x3aa3b1(0x2f0)][_0x3aa3b1(0x354)](this);else for(const _0x45e31a of _0x444695){if(!_0x45e31a)continue;_0x45e31a[_0x3aa3b1(0x28e)](_0x5ddfbe[_0x3aa3b1(0x2ec)]);const _0x36e338=String(RegExp['$1'])[_0x3aa3b1(0x25c)](','),_0x36ad43=this[_0x3aa3b1(0x31f)](_0x36e338,_0x505e0c)[_0x3aa3b1(0x316)]((_0x4e83cf,_0x57049a)=>_0x4e83cf-_0x57049a);if(_0x36ad43['length']<=0x1)continue;const _0x13ba07=_0x36ad43[_0x3aa3b1(0x149)]('-'),_0x553683=_0x505e0c?DataManager[_0x3aa3b1(0x312)]:DataManager['_btbItemFlexFusion'];_0x553683[_0x13ba07]=_0x6fcd51['id'];}}const _0xa6de4d=_0x253301['match'](_0x5ddfbe['FusionStrict']);if(_0xa6de4d)for(const _0xe5c57 of _0xa6de4d){if(!_0xe5c57)continue;_0xe5c57[_0x3aa3b1(0x28e)](_0x5ddfbe[_0x3aa3b1(0x302)]);const _0x39ff83=String(RegExp['$1'])[_0x3aa3b1(0x25c)](','),_0x3605d2=this[_0x3aa3b1(0x31f)](_0x39ff83,_0x505e0c);if(_0x3605d2[_0x3aa3b1(0x2f9)]<=0x1)continue;const _0x309fa2=_0x3605d2['join']('-'),_0x3f9330=_0x505e0c?DataManager[_0x3aa3b1(0x312)]:DataManager[_0x3aa3b1(0x1a4)];_0x3f9330[_0x309fa2]=_0x6fcd51['id'];}},DataManager['btbParseFusionData']=function(_0x12eb8e,_0x277296){const _0x1adfde=_0x2beff5,_0xd7184=[];for(let _0xca2c9e of _0x12eb8e){if(_0x1adfde(0x35e)!==_0x1adfde(0x2a6)){_0xca2c9e=(String(_0xca2c9e)||'')['trim']();const _0x5c3987=/^\d+$/[_0x1adfde(0x2a4)](_0xca2c9e);if(_0x5c3987){if(_0x1adfde(0x135)!=='uXcgi')_0xd7184['push'](Number(_0xca2c9e));else{const _0x21461a=this[_0x1adfde(0x274)](),_0x120818=_0x5137be[_0x1adfde(0x3c9)]();if(_0x120818)_0x120818[_0x1adfde(0x3a8)](_0x21461a?_0x21461a['id']:null);_0x3f3629['prototype'][_0x1adfde(0x125)]['call'](this);}}else{if(_0x277296)_0xd7184[_0x1adfde(0x301)](DataManager[_0x1adfde(0x209)](_0xca2c9e));else{if('PGmCk'!==_0x1adfde(0x2d4))return _0x1d4615[_0x1adfde(0x157)]()&&this[_0x1adfde(0x2a5)]()>0x1?![]:_0x339bef[_0x1adfde(0x39a)][_0x1adfde(0x1ac)][_0x1adfde(0x354)](this);else _0xd7184['push'](DataManager[_0x1adfde(0x31b)](_0xca2c9e));}}}else _0x35e262[_0x1adfde(0x39a)][_0x1adfde(0x18c)]['call'](this),this[_0x1adfde(0x283)]();}return _0xd7184;},ImageManager[_0x2beff5(0x1b0)]=VisuMZ[_0x2beff5(0x39a)][_0x2beff5(0x3a4)][_0x2beff5(0x10e)]['BravePointsIcon'],ImageManager['svActorHorzCells']=ImageManager['svActorHorzCells']||0x9,ImageManager[_0x2beff5(0x193)]=ImageManager[_0x2beff5(0x193)]||0x6,TextManager[_0x2beff5(0x38f)]=VisuMZ[_0x2beff5(0x39a)][_0x2beff5(0x3a4)][_0x2beff5(0x10e)][_0x2beff5(0x2b2)],TextManager['btbBravePointsAbbr']=VisuMZ['BattleSystemBTB']['Settings'][_0x2beff5(0x10e)][_0x2beff5(0x1da)],TextManager[_0x2beff5(0x370)]=VisuMZ[_0x2beff5(0x39a)]['Settings'][_0x2beff5(0x10e)][_0x2beff5(0x3d0)],TextManager[_0x2beff5(0x266)]=VisuMZ[_0x2beff5(0x39a)]['Settings'][_0x2beff5(0x20c)]['CommandName'],TextManager[_0x2beff5(0x17b)]=VisuMZ[_0x2beff5(0x39a)][_0x2beff5(0x3a4)][_0x2beff5(0x20c)][_0x2beff5(0x186)],TextManager[_0x2beff5(0x14c)]=VisuMZ[_0x2beff5(0x39a)][_0x2beff5(0x3a4)][_0x2beff5(0x20c)][_0x2beff5(0x369)],SceneManager[_0x2beff5(0x249)]=function(){const _0x54427c=_0x2beff5;return this[_0x54427c(0x1f5)]&&this[_0x54427c(0x1f5)][_0x54427c(0x398)]===Scene_Battle;},VisuMZ[_0x2beff5(0x39a)]['BattleManager_battleSys']=BattleManager['battleSys'],BattleManager[_0x2beff5(0x2ee)]=function(){const _0x2fa590=_0x2beff5;if(this[_0x2fa590(0x157)]())return _0x2fa590(0x228);return VisuMZ[_0x2fa590(0x39a)][_0x2fa590(0x29c)]['call'](this);},BattleManager[_0x2beff5(0x157)]=function(){return $gameSystem['getBattleSystem']()==='BTB';},VisuMZ['BattleSystemBTB'][_0x2beff5(0x2a3)]=BattleManager[_0x2beff5(0x3cc)],BattleManager[_0x2beff5(0x3cc)]=function(){const _0x2b4295=_0x2beff5;if(this['isBTB']())return![];return VisuMZ[_0x2b4295(0x39a)]['BattleManager_isTpb'][_0x2b4295(0x354)](this);},VisuMZ[_0x2beff5(0x39a)][_0x2beff5(0x3c2)]=BattleManager[_0x2beff5(0x14d)],BattleManager['isActiveTpb']=function(){const _0xd4ff07=_0x2beff5;if(this[_0xd4ff07(0x157)]())return![];return VisuMZ[_0xd4ff07(0x39a)][_0xd4ff07(0x3c2)][_0xd4ff07(0x354)](this);},VisuMZ[_0x2beff5(0x39a)]['BattleManager_isTurnBased']=BattleManager[_0x2beff5(0x1cf)],BattleManager[_0x2beff5(0x1cf)]=function(){const _0x749af1=_0x2beff5;if(this[_0x749af1(0x157)]())return!![];return VisuMZ['BattleSystemBTB'][_0x749af1(0x126)]['call'](this);},VisuMZ[_0x2beff5(0x39a)][_0x2beff5(0x264)]=BattleManager[_0x2beff5(0x246)],BattleManager[_0x2beff5(0x246)]=function(){const _0x5532ae=_0x2beff5;VisuMZ['BattleSystemBTB']['BattleManager_startInput'][_0x5532ae(0x354)](this),this['isBTB']()&&this['isSkipPartyCommandWindow']()&&!this['_surprise']&&$gameParty[_0x5532ae(0x33f)]()&&(_0x5532ae(0x341)===_0x5532ae(0x2ab)?this['updateTurnOrderBTB']():this[_0x5532ae(0x23a)]());},VisuMZ['BattleSystemBTB']['BattleManager_startTurn']=BattleManager[_0x2beff5(0x222)],BattleManager[_0x2beff5(0x222)]=function(){const _0x2d1f0b=_0x2beff5;VisuMZ[_0x2d1f0b(0x39a)]['BattleManager_startTurn'][_0x2d1f0b(0x354)](this),this[_0x2d1f0b(0x3e0)]();},BattleManager[_0x2beff5(0x3e0)]=function(){const _0xa667c8=_0x2beff5;if(!SceneManager[_0xa667c8(0x249)]())return;if(!this[_0xa667c8(0x157)]())return;const _0xf36bd3=SceneManager[_0xa667c8(0x1f5)];if(!_0xf36bd3)return;const _0x17c862=_0xf36bd3[_0xa667c8(0x1d2)];if(!_0x17c862)return;_0x17c862[_0xa667c8(0x2df)]();},VisuMZ[_0x2beff5(0x39a)][_0x2beff5(0x24a)]=BattleManager[_0x2beff5(0x1c0)],BattleManager['makeActionOrders']=function(){const _0x32b32c=_0x2beff5;VisuMZ[_0x32b32c(0x39a)][_0x32b32c(0x24a)]['call'](this),this[_0x32b32c(0x157)]()&&(_0x32b32c(0x334)!=='xbBPo'?(this['_actionBattlers']=this[_0x32b32c(0x2e8)][_0x32b32c(0x307)](_0x26a538=>_0x26a538&&_0x26a538[_0x32b32c(0x15a)]['length']>0x0),this[_0x32b32c(0x207)]()):(this[_0x32b32c(0x169)](),this[_0x32b32c(0x3da)]()));},BattleManager[_0x2beff5(0x27e)]=function(){const _0x1315b3=_0x2beff5;if(!this[_0x1315b3(0x157)]())return;if(!SceneManager[_0x1315b3(0x249)]())return;const _0x18df83=this[_0x1315b3(0x2e8)];for(const _0x2c9966 of _0x18df83){_0x2c9966[_0x1315b3(0x133)]();}_0x18df83[_0x1315b3(0x316)]((_0x2df501,_0xfed082)=>_0xfed082[_0x1315b3(0x18f)]()-_0x2df501['speed']()),this[_0x1315b3(0x157)]()&&this[_0x1315b3(0x207)]();},BattleManager[_0x2beff5(0x1b9)]=function(){const _0x26263d=_0x2beff5;if(!this['isBTB']())return;this[_0x26263d(0x2e8)]=this[_0x26263d(0x2e8)]||[],this[_0x26263d(0x2e8)]=this[_0x26263d(0x2e8)][_0x26263d(0x307)](_0x465b30=>_0x465b30&&_0x465b30['isAppeared']()&&_0x465b30[_0x26263d(0x1a5)]()),this[_0x26263d(0x207)]();},BattleManager[_0x2beff5(0x207)]=function(_0x3f4df7){const _0x2e00ab=_0x2beff5;if(!this[_0x2e00ab(0x157)]())return;const _0x45246c=SceneManager[_0x2e00ab(0x1f5)][_0x2e00ab(0x170)];if(!_0x45246c)return;_0x45246c[_0x2e00ab(0x3b0)](_0x3f4df7);},VisuMZ[_0x2beff5(0x39a)][_0x2beff5(0x238)]=BattleManager[_0x2beff5(0x33b)],BattleManager['startAction']=function(){const _0x532aa5=_0x2beff5;BattleManager[_0x532aa5(0x157)]()&&this['_subject']&&this[_0x532aa5(0x34d)][_0x532aa5(0x220)](),VisuMZ[_0x532aa5(0x39a)]['BattleManager_startAction'][_0x532aa5(0x354)](this);},VisuMZ['BattleSystemBTB'][_0x2beff5(0x146)]=Game_System[_0x2beff5(0x2fe)]['initialize'],Game_System[_0x2beff5(0x2fe)][_0x2beff5(0x1c4)]=function(){const _0x4315d4=_0x2beff5;VisuMZ[_0x4315d4(0x39a)][_0x4315d4(0x146)][_0x4315d4(0x354)](this),this[_0x4315d4(0x1ba)]();},Game_System['prototype'][_0x2beff5(0x1ba)]=function(){const _0x5bcc5e=_0x2beff5;this[_0x5bcc5e(0x298)]=!![];},Game_System[_0x2beff5(0x2fe)]['isBattleSystemBTBTurnOrderVisible']=function(){const _0x4e1718=_0x2beff5;return this[_0x4e1718(0x298)]===undefined&&this['initBattleSystemBTB'](),this[_0x4e1718(0x298)];},Game_System['prototype'][_0x2beff5(0x308)]=function(_0x5786c5){const _0x368a17=_0x2beff5;this[_0x368a17(0x298)]===undefined&&this[_0x368a17(0x1ba)](),this[_0x368a17(0x298)]=_0x5786c5;},VisuMZ[_0x2beff5(0x39a)][_0x2beff5(0x350)]=Game_Action[_0x2beff5(0x2fe)][_0x2beff5(0x3bf)],Game_Action[_0x2beff5(0x2fe)][_0x2beff5(0x3bf)]=function(_0x5bd7f5){const _0x2cbd73=_0x2beff5;VisuMZ[_0x2cbd73(0x39a)][_0x2cbd73(0x350)][_0x2cbd73(0x354)](this,_0x5bd7f5),this[_0x2cbd73(0x30d)](_0x5bd7f5);},Game_Action[_0x2beff5(0x2fe)][_0x2beff5(0x30d)]=function(_0x53e3c7){const _0x40b4f9=_0x2beff5;if(!BattleManager['isBTB']())return;if(this[_0x40b4f9(0x274)]())this[_0x40b4f9(0x15e)](_0x53e3c7);},Game_Action[_0x2beff5(0x2fe)][_0x2beff5(0x15e)]=function(_0x39a14e){const _0xf277a7=_0x2beff5,_0x18743a=VisuMZ[_0xf277a7(0x39a)][_0xf277a7(0x145)],_0x5d7f0e=this['item']()['note'],_0x518d1b=this[_0xf277a7(0x274)]();if(this[_0xf277a7(0x328)]()){if('caVUk'===_0xf277a7(0x132)){if(_0x5d7f0e['match'](_0x18743a[_0xf277a7(0x265)])){if(_0xf277a7(0x1d8)!==_0xf277a7(0x150)){const _0x411f85=Number(RegExp['$1']);this[_0xf277a7(0x328)]()[_0xf277a7(0x26c)](_0x411f85);}else _0x826913[_0xf277a7(0x39a)][_0xf277a7(0x219)][_0xf277a7(0x354)](this),_0x44a746[_0xf277a7(0x157)]()&&this===_0x27bced&&_0x325b6c[_0xf277a7(0x249)]()&&_0x1a7ff2[_0xf277a7(0x1c0)]();}if(_0x5d7f0e[_0xf277a7(0x28e)](_0x18743a[_0xf277a7(0x148)])){const _0x2d414d=Number(RegExp['$1']);this[_0xf277a7(0x328)]()['gainBravePoints'](_0x2d414d);}const _0x5cd131='JsBravePointsUser',_0x142297=VisuMZ[_0xf277a7(0x39a)]['createKeyJS'](_0x518d1b,_0x5cd131);if(VisuMZ[_0xf277a7(0x39a)]['JS'][_0x142297]){if(_0xf277a7(0x250)===_0xf277a7(0x250)){const _0x52478d=VisuMZ[_0xf277a7(0x39a)]['JS'][_0x142297][_0xf277a7(0x354)](this,this[_0xf277a7(0x328)](),_0x39a14e,this[_0xf277a7(0x328)]()[_0xf277a7(0x253)]());this[_0xf277a7(0x328)]()[_0xf277a7(0x26c)](_0x52478d);}else{const _0x343db2=this[_0xf277a7(0x3a6)]()[_0xf277a7(0x127)];if(_0x343db2['match'](/<BTB TURN ORDER FACE:[ ](.*),[ ](\d+)>/i))return _0x34ed49(_0x293d40['$1']);return _0x3349e9[_0xf277a7(0x3a4)]['EnemyBattlerFaceName'];}}}else _0xb8507a+=_0x13b25f(_0x1cba5e['$1']);}if(_0x39a14e){if(_0x5d7f0e[_0xf277a7(0x28e)](_0x18743a[_0xf277a7(0x10f)])){const _0x2b8c2f=Number(RegExp['$1']);_0x39a14e['setBravePoints'](_0x2b8c2f);}if(_0x5d7f0e[_0xf277a7(0x28e)](_0x18743a['BravePointAlterTarget'])){if(_0xf277a7(0x1be)!=='WRJrQ')return _0x3c2458[_0xf277a7(0x39a)][_0xf277a7(0x2d1)][_0xf277a7(0x354)](this);else{const _0x2adb6d=Number(RegExp['$1']);_0x39a14e[_0xf277a7(0x180)](_0x2adb6d);}}const _0x283aa4=_0xf277a7(0x3d6),_0x5c8e36=VisuMZ[_0xf277a7(0x39a)][_0xf277a7(0x155)](_0x518d1b,_0x283aa4);if(VisuMZ[_0xf277a7(0x39a)]['JS'][_0x5c8e36]){const _0x59f1e7=VisuMZ[_0xf277a7(0x39a)]['JS'][_0x5c8e36]['call'](this,this['subject'](),_0x39a14e,_0x39a14e[_0xf277a7(0x253)]());_0x39a14e[_0xf277a7(0x26c)](_0x59f1e7);}}},VisuMZ['BattleSystemBTB'][_0x2beff5(0x22f)]=Game_Action['prototype'][_0x2beff5(0x18f)],Game_Action[_0x2beff5(0x2fe)]['speed']=function(){const _0x566232=_0x2beff5;if(BattleManager['isBTB']())return VisuMZ['BattleSystemBTB'][_0x566232(0x3a4)][_0x566232(0x23b)]['CalcActionSpeedJS'][_0x566232(0x354)](this);else{if('TgoXI'==='TgoXI')return VisuMZ['BattleSystemBTB'][_0x566232(0x22f)][_0x566232(0x354)](this);else _0x129104[_0x566232(0x157)]()?this[_0x566232(0x23a)]():_0x267beb[_0x566232(0x39a)][_0x566232(0x35b)][_0x566232(0x354)](this);}},VisuMZ[_0x2beff5(0x39a)][_0x2beff5(0x33a)]=Game_Action[_0x2beff5(0x2fe)][_0x2beff5(0x28c)],Game_Action[_0x2beff5(0x2fe)][_0x2beff5(0x28c)]=function(){const _0x2f33ba=_0x2beff5;return BattleManager[_0x2f33ba(0x157)]()?VisuMZ[_0x2f33ba(0x39a)][_0x2f33ba(0x3a4)]['Mechanics'][_0x2f33ba(0x233)]:VisuMZ[_0x2f33ba(0x39a)][_0x2f33ba(0x33a)][_0x2f33ba(0x354)](this);},VisuMZ[_0x2beff5(0x39a)][_0x2beff5(0x388)]=Game_Action[_0x2beff5(0x2fe)][_0x2beff5(0x3a8)],Game_Action[_0x2beff5(0x2fe)][_0x2beff5(0x3a8)]=function(_0xbdf238){const _0x192cdd=_0x2beff5;VisuMZ[_0x192cdd(0x39a)]['Game_Action_setSkill']['call'](this,_0xbdf238),BattleManager[_0x192cdd(0x27e)]();},VisuMZ[_0x2beff5(0x39a)][_0x2beff5(0x3de)]=Game_Action['prototype'][_0x2beff5(0x198)],Game_Action[_0x2beff5(0x2fe)][_0x2beff5(0x198)]=function(_0x139ae4){const _0x41551=_0x2beff5;VisuMZ[_0x41551(0x39a)][_0x41551(0x3de)][_0x41551(0x354)](this,_0x139ae4),BattleManager[_0x41551(0x27e)]();},Game_Action[_0x2beff5(0x2fe)][_0x2beff5(0x352)]=function(_0x1d58f9){const _0x3fd9e5=_0x2beff5;this[_0x3fd9e5(0x1c2)]=_0x1d58f9;},Game_Action['prototype'][_0x2beff5(0x358)]=function(){const _0x20ef8c=_0x2beff5;if(this['_actionFusionRecipe']===undefined)return 0x0;return this[_0x20ef8c(0x1c2)][_0x20ef8c(0x25c)]('-')[_0x20ef8c(0x2f9)]-0x1;},Game_Action[_0x2beff5(0x2fe)]['getActionFusionRecipeSkills']=function(){const _0x24c30b=_0x2beff5;if(this[_0x24c30b(0x1c2)]===undefined)return[];return this[_0x24c30b(0x1c2)]['split']('-')[_0x24c30b(0x2fd)](_0xdda837=>$dataSkills[Number(_0xdda837)]);},Game_Action[_0x2beff5(0x2fe)][_0x2beff5(0x11d)]=function(){const _0x4ecae9=_0x2beff5;if(this[_0x4ecae9(0x1c2)]===undefined)return[];return this[_0x4ecae9(0x1c2)][_0x4ecae9(0x25c)]('-')['map'](_0x27c5bd=>$dataItems[Number(_0x27c5bd)]);},Game_BattlerBase[_0x2beff5(0x2fe)][_0x2beff5(0x253)]=function(){return this['_bravePoints']||0x0;},Game_BattlerBase[_0x2beff5(0x36a)]=VisuMZ[_0x2beff5(0x39a)][_0x2beff5(0x3a4)]['Mechanics']['MaxActionsDefault'],Game_BattlerBase[_0x2beff5(0x343)]=VisuMZ[_0x2beff5(0x39a)][_0x2beff5(0x3a4)]['Mechanics'][_0x2beff5(0x1a6)],Game_BattlerBase['prototype']['maxBraveActions']=function(){const _0x33e40b=_0x2beff5;if(this[_0x33e40b(0x2b0)]())return 0x1;if(this[_0x33e40b(0x147)]())return 0x1;const _0x527f6d=VisuMZ[_0x33e40b(0x39a)][_0x33e40b(0x145)],_0x59c3ef=_0x527f6d[_0x33e40b(0x23c)];let _0x6a74a9=Game_BattlerBase['BTB_MAX_ACTIONS_DEFAULT'];const _0x32e66e=this[_0x33e40b(0x32c)]();for(const _0x7e6217 of _0x32e66e){if(!_0x7e6217)continue;const _0x12763c=_0x7e6217['note'];if(_0x12763c['match'](_0x59c3ef)){if(_0x33e40b(0x2bb)===_0x33e40b(0x34c)){const _0x4a8631=this[_0x33e40b(0x263)]();this[_0x33e40b(0x379)](_0x4a8631),_0x1ad96d[_0x33e40b(0x2fe)]['initialize'][_0x33e40b(0x354)](this,_0x4a8631),this['createBattlerSprites'](),this[_0x33e40b(0x28a)](),this[_0x33e40b(0x217)]=0x0;}else _0x6a74a9+=Number(RegExp['$1']);}}return _0x6a74a9[_0x33e40b(0x3bc)](0x1,Game_BattlerBase['BTB_MAX_ACTIONS_HARD_CAP']);},Game_BattlerBase['BTB_MAX_BRAVEPOINTS_DEFAULT']=VisuMZ[_0x2beff5(0x39a)][_0x2beff5(0x3a4)][_0x2beff5(0x23b)]['MaxBravePointsDefault'],Game_BattlerBase[_0x2beff5(0x154)]=VisuMZ[_0x2beff5(0x39a)][_0x2beff5(0x3a4)][_0x2beff5(0x23b)][_0x2beff5(0x2f3)],Game_BattlerBase[_0x2beff5(0x3c8)]=VisuMZ[_0x2beff5(0x39a)][_0x2beff5(0x3a4)][_0x2beff5(0x23b)]['MaxBravePointsHardCap'],Game_BattlerBase['BTB_MIN_BRAVEPOINTS_HARD_CAP']=VisuMZ[_0x2beff5(0x39a)]['Settings']['Mechanics'][_0x2beff5(0x309)],Game_BattlerBase[_0x2beff5(0x2fe)]['maxBravePoints']=function(){const _0x4595c5=_0x2beff5,_0x1119c2=VisuMZ[_0x4595c5(0x39a)][_0x4595c5(0x145)],_0x29eebf=_0x1119c2[_0x4595c5(0x292)];let _0x56950b=Game_BattlerBase[_0x4595c5(0x1cb)];const _0x416f9=this[_0x4595c5(0x32c)]();for(const _0x2864b6 of _0x416f9){if(!_0x2864b6)continue;const _0x7ce3ba=_0x2864b6[_0x4595c5(0x127)];_0x7ce3ba[_0x4595c5(0x28e)](_0x29eebf)&&(_0x56950b+=Number(RegExp['$1']));}return Math[_0x4595c5(0x25d)](_0x56950b,Game_BattlerBase[_0x4595c5(0x3c8)]);},Game_BattlerBase[_0x2beff5(0x2fe)]['minBravePoints']=function(){const _0x5670dd=_0x2beff5,_0x39342e=VisuMZ[_0x5670dd(0x39a)]['RegExp'],_0xf7be3e=_0x39342e[_0x5670dd(0x115)];let _0x2878d7=Game_BattlerBase[_0x5670dd(0x154)];const _0x242d9a=this['traitObjects']();for(const _0x1c6c23 of _0x242d9a){if('KqLQL'!==_0x5670dd(0x224)){if(!_0x1c6c23)continue;const _0x144078=_0x1c6c23['note'];_0x144078['match'](_0xf7be3e)&&(_0x2878d7+=Number(RegExp['$1']));}else _0x31b7e6[_0x5670dd(0x2e5)]=_0x3ff6ed[_0x5670dd(0x2ac)](_0x2386ae[_0x1108a1]);}return Math[_0x5670dd(0x142)](_0x2878d7,Game_BattlerBase[_0x5670dd(0x11e)]);},Game_BattlerBase[_0x2beff5(0x2fe)][_0x2beff5(0x26c)]=function(_0x2d99e3){const _0x8ac1b8=_0x2beff5;this[_0x8ac1b8(0x1f8)]=Math[_0x8ac1b8(0x25d)](_0x2d99e3,this[_0x8ac1b8(0x3ac)]()),this['refresh']();},Game_BattlerBase[_0x2beff5(0x2fe)][_0x2beff5(0x180)]=function(_0xe2ca94){const _0x571e60=_0x2beff5;_0xe2ca94+=this[_0x571e60(0x1f8)]||0x0,this[_0x571e60(0x26c)](_0xe2ca94);},Game_BattlerBase['prototype'][_0x2beff5(0x2ef)]=function(_0x1f4a11){const _0x1cf5c6=_0x2beff5;this[_0x1cf5c6(0x180)](-_0x1f4a11);},Game_BattlerBase['prototype'][_0x2beff5(0x134)]=function(_0x4c2430){const _0xb67e41=_0x2beff5,_0x5ea616=VisuMZ[_0xb67e41(0x39a)]['Settings']['Mechanics'];if(!_0x4c2430)return _0x5ea616[_0xb67e41(0x30c)];if(DataManager[_0xb67e41(0x21d)](_0x4c2430)){if(_0xb67e41(0x2d5)!==_0xb67e41(0x2d5)){const _0x2f42d0=new _0x56887b(this);_0x2f42d0['setSkill'](_0x45eaa0),_0x2f42d0[_0xb67e41(0x300)]=!![],this['_actions'][_0xb67e41(0x301)](_0x2f42d0);}else{if(_0x4c2430['id']===this[_0xb67e41(0x167)]())return 0x0;if(this[_0xb67e41(0x3c5)]()&&this[_0xb67e41(0x3c5)]()['item']()===_0x4c2430&&this['currentAction']()[_0xb67e41(0x235)])return 0x0;}}const _0x123505=VisuMZ[_0xb67e41(0x39a)]['RegExp'],_0x2c8714=_0x4c2430[_0xb67e41(0x127)];if(_0x2c8714[_0xb67e41(0x28e)](_0x123505[_0xb67e41(0x22b)]))return Number(RegExp['$1']);let _0x5b7114=0x0;if(DataManager[_0xb67e41(0x21d)](_0x4c2430))_0xb67e41(0x1a3)!=='jcuFl'?_0x5b7114=_0x5ea616[_0xb67e41(0x1d7)]:(_0x4a509b['BattleSystemBTB'][_0xb67e41(0x388)][_0xb67e41(0x354)](this,_0x554885),_0x57a096[_0xb67e41(0x27e)]());else{if(DataManager[_0xb67e41(0x111)](_0x4c2430)){if(_0xb67e41(0x1de)!==_0xb67e41(0x1de))return _0xb67e41(0x34e);else _0x5b7114=_0x5ea616[_0xb67e41(0x13e)];}}return _0x5b7114[_0xb67e41(0x3bc)](0x0,Game_BattlerBase[_0xb67e41(0x3c8)]);},VisuMZ[_0x2beff5(0x39a)][_0x2beff5(0x3d5)]=Game_BattlerBase[_0x2beff5(0x2fe)]['canUse'],Game_BattlerBase[_0x2beff5(0x2fe)][_0x2beff5(0x256)]=function(_0x152f28){const _0x1944c9=_0x2beff5;if(_0x152f28&&SceneManager[_0x1944c9(0x249)]()&&BattleManager[_0x1944c9(0x157)]()){const _0x5bb7e8=this['bravePointsCost'](_0x152f28);if(this[_0x1944c9(0x253)]()-_0x5bb7e8<this[_0x1944c9(0x1bb)]())return![];}return VisuMZ[_0x1944c9(0x39a)][_0x1944c9(0x3d5)][_0x1944c9(0x354)](this,_0x152f28);},Game_BattlerBase['prototype'][_0x2beff5(0x12a)]=function(_0x4817f2){const _0x534587=_0x2beff5;if(!BattleManager[_0x534587(0x157)]())return;const _0x3659f6=this[_0x534587(0x134)](_0x4817f2);this[_0x534587(0x2ef)](_0x3659f6);},VisuMZ[_0x2beff5(0x39a)]['Game_Battler_useItem']=Game_Battler['prototype'][_0x2beff5(0x226)],Game_Battler[_0x2beff5(0x2fe)][_0x2beff5(0x226)]=function(_0xd72fa5){const _0x64da97=_0x2beff5;if(this[_0x64da97(0x2de)](_0xd72fa5)){if(_0x64da97(0x179)!=='FHpkA'){this[_0x64da97(0x2bc)](_0xd72fa5);return;}else this['_btbTurnOrderIconIndex']=_0x50107a;}VisuMZ[_0x64da97(0x39a)][_0x64da97(0x37a)]['call'](this,_0xd72fa5),this['payBravePointsCost'](_0xd72fa5);},Game_Battler[_0x2beff5(0x2fe)][_0x2beff5(0x2de)]=function(_0x4c3d0a){const _0x50780a=_0x2beff5;if(!BattleManager[_0x50780a(0x157)]())return![];if(!SceneManager[_0x50780a(0x249)]())return![];if(!this[_0x50780a(0x336)]())return![];if(this!==BattleManager[_0x50780a(0x34d)])return![];if(!this[_0x50780a(0x3c5)]())return![];if(!this[_0x50780a(0x3c5)]()['item']())return![];if(this[_0x50780a(0x3c5)]()[_0x50780a(0x274)]()!==_0x4c3d0a)return![];if(this[_0x50780a(0x3c5)]()['isSkill']())return this[_0x50780a(0x3c5)]()[_0x50780a(0x27b)]()['length']>0x0;else{if(this[_0x50780a(0x3c5)]()[_0x50780a(0x111)]()){if(_0x50780a(0x2a9)===_0x50780a(0x1cc)){if(this[_0x50780a(0x157)]())return!![];return _0x51abcc[_0x50780a(0x39a)][_0x50780a(0x126)][_0x50780a(0x354)](this);}else return this['currentAction']()['getActionFusionRecipeItems']()[_0x50780a(0x2f9)]>0x0;}else return![];}},Game_Battler[_0x2beff5(0x2fe)][_0x2beff5(0x2bc)]=function(_0x409350){const _0x390c40=_0x2beff5;if(!SceneManager['isSceneBattle']())return;DataManager[_0x390c40(0x21d)](_0x409350)?this[_0x390c40(0x123)]():this[_0x390c40(0x1b2)]();},Game_Battler[_0x2beff5(0x2fe)]['btbPaySkillFusionCosts']=function(){const _0xc1d4c=_0x2beff5,_0x593fba=this[_0xc1d4c(0x3c5)]()[_0xc1d4c(0x27b)]();if(!_0x593fba)return;for(const _0x3b423d of _0x593fba){if(!_0x3b423d)continue;if(!this[_0xc1d4c(0x256)](_0x3b423d))return![];VisuMZ[_0xc1d4c(0x39a)][_0xc1d4c(0x37a)]['call'](this,_0x3b423d),this[_0xc1d4c(0x12a)](_0x3b423d);}return!![];},Game_Battler[_0x2beff5(0x2fe)][_0x2beff5(0x1b2)]=function(){const _0x3f448c=_0x2beff5,_0x1e0b85=this[_0x3f448c(0x3c5)]()['getActionFusionRecipeItems']();if(!_0x1e0b85)return;for(const _0x2f43a1 of _0x1e0b85){if(!_0x2f43a1)continue;if(!this[_0x3f448c(0x256)](_0x2f43a1))return![];VisuMZ[_0x3f448c(0x39a)]['Game_Battler_useItem'][_0x3f448c(0x354)](this,_0x2f43a1),this[_0x3f448c(0x12a)](_0x2f43a1);}return!![];},Game_BattlerBase['prototype'][_0x2beff5(0x2da)]=function(){const _0x521951=_0x2beff5,_0x528a57=this[_0x521951(0x253)]()-this['predictedBravePointCost']()+this[_0x521951(0x2f6)]();return _0x528a57[_0x521951(0x3bc)](Game_BattlerBase[_0x521951(0x11e)],this[_0x521951(0x3ac)]());},Game_BattlerBase[_0x2beff5(0x2fe)][_0x2beff5(0x33c)]=function(){const _0xceae94=_0x2beff5;let _0x331532=0x0;for(const _0x10bd25 of this[_0xceae94(0x15a)]){if(_0xceae94(0x3d1)!==_0xceae94(0x1b3)){if(!_0x10bd25)continue;const _0x5b5135=_0x10bd25[_0xceae94(0x274)]();_0x331532+=this['bravePointsCost'](_0x5b5135);}else{if(!_0x9d19e8['Settings'][_0xceae94(0x11f)])return;const _0x53f2d9=_0x1c30b4[_0xceae94(0x3a4)],_0x1458ba=this[_0xceae94(0x2a1)]===_0x2292d7?_0xceae94(0x172):_0xceae94(0x1c9),_0x437705=_0xceae94(0x395)[_0xceae94(0x13d)](_0x1458ba),_0x1f0a53=new _0x5bd7c1();_0x1f0a53[_0xceae94(0x303)]['x']=this[_0xceae94(0x303)]['x'],_0x1f0a53[_0xceae94(0x303)]['y']=this[_0xceae94(0x303)]['y'];if(_0x53f2d9[_0x437705])_0x1f0a53['bitmap']=_0x46b103[_0xceae94(0x2ac)](_0x53f2d9[_0x437705]);else{const _0x14b7e6=this[_0xceae94(0x38b)](),_0x74ffac=this[_0xceae94(0x3df)]();_0x1f0a53[_0xceae94(0x2e5)]=new _0x5c7732(_0x14b7e6,_0x74ffac);const _0x19d48c=_0x53b9c4[_0xceae94(0x2f2)](_0x53f2d9[_0xceae94(0x1c1)[_0xceae94(0x13d)](_0x1458ba)]),_0x5a8ce6=_0x10f1c0[_0xceae94(0x2f2)](_0x53f2d9[_0xceae94(0x20b)[_0xceae94(0x13d)](_0x1458ba)]);_0x1f0a53['bitmap']['gradientFillRect'](0x0,0x0,_0x14b7e6,_0x74ffac,_0x19d48c,_0x5a8ce6,!![]);}this[_0xceae94(0x182)]=_0x1f0a53,this[_0xceae94(0x240)](this['_backgroundSprite']);}}return _0x331532;},VisuMZ[_0x2beff5(0x39a)][_0x2beff5(0x2d1)]=Game_BattlerBase[_0x2beff5(0x2fe)]['canInput'],Game_BattlerBase[_0x2beff5(0x2fe)]['canInput']=function(){const _0x14df34=_0x2beff5;if(BattleManager[_0x14df34(0x157)]()&&this['bravePoints']()<0x0)return![];else{if(_0x14df34(0x3d3)==='NLlaF')return VisuMZ['BattleSystemBTB']['Game_BattlerBase_canInput'][_0x14df34(0x354)](this);else{const _0x385890=this['actor']()[_0x14df34(0x127)];if(_0x385890[_0x14df34(0x28e)](/<BTB TURN ORDER ICON:[ ](\d+)>/i))return _0x39b38e(_0x240622['$1']);return _0x5dccef[_0x14df34(0x3a4)][_0x14df34(0x1b1)];}}},VisuMZ[_0x2beff5(0x39a)]['Game_BattlerBase_canGuard']=Game_BattlerBase['prototype'][_0x2beff5(0x116)],Game_BattlerBase[_0x2beff5(0x2fe)][_0x2beff5(0x116)]=function(){const _0xf2f510=_0x2beff5;if(BattleManager['isBTB']()&&this[_0xf2f510(0x2a5)]()>0x1){if(_0xf2f510(0x3a9)===_0xf2f510(0x2c5))_0x517305[_0xf2f510(0x39a)][_0xf2f510(0x3d7)][_0xf2f510(0x354)](this,_0x5b8086);else return![];}else return VisuMZ[_0xf2f510(0x39a)][_0xf2f510(0x1ac)][_0xf2f510(0x354)](this);},Game_BattlerBase[_0x2beff5(0x2fe)][_0x2beff5(0x1df)]=function(){const _0x3d727d=_0x2beff5;if(this[_0x3d727d(0x2b0)]())return![];return this[_0x3d727d(0x2a5)]()<this[_0x3d727d(0x159)]()&&this['_bravePoints']>this[_0x3d727d(0x1bb)]();},Game_BattlerBase[_0x2beff5(0x2fe)][_0x2beff5(0x2b0)]=function(){const _0x2cd0c9=_0x2beff5,_0x57ad28=VisuMZ[_0x2cd0c9(0x39a)]['RegExp'],_0x3da5b5=_0x57ad28[_0x2cd0c9(0x258)];return this[_0x2cd0c9(0x32c)]()[_0x2cd0c9(0x1ae)](_0x3f1660=>_0x3f1660&&_0x3f1660[_0x2cd0c9(0x127)]['match'](_0x3da5b5));},Game_BattlerBase[_0x2beff5(0x2fe)][_0x2beff5(0x147)]=function(){const _0xaf0b3e=_0x2beff5,_0x8d0629=VisuMZ[_0xaf0b3e(0x39a)][_0xaf0b3e(0x145)],_0x1f6629=_0x8d0629[_0xaf0b3e(0x213)];return this['traitObjects']()[_0xaf0b3e(0x1ae)](_0xde4aab=>_0xde4aab&&_0xde4aab[_0xaf0b3e(0x127)][_0xaf0b3e(0x28e)](_0x1f6629));},Game_BattlerBase[_0x2beff5(0x2fe)][_0x2beff5(0x1f4)]=function(){const _0x6c93f7=_0x2beff5;delete this[_0x6c93f7(0x16e)],delete this['_btbTurnOrderFaceName'],delete this[_0x6c93f7(0x13f)],delete this[_0x6c93f7(0x208)];},Game_BattlerBase[_0x2beff5(0x2fe)]['TurnOrderBTBGraphicType']=function(){const _0x45637a=_0x2beff5;if(this[_0x45637a(0x16e)]===undefined){if(_0x45637a(0x230)===_0x45637a(0x230))this[_0x45637a(0x16e)]=this['createTurnOrderBTBGraphicType']();else{if(this[_0x45637a(0x1d0)]!==_0x5c2c39[_0x45637a(0x32d)]())return this[_0x45637a(0x27f)]();}}return this[_0x45637a(0x16e)];},Game_BattlerBase[_0x2beff5(0x2fe)][_0x2beff5(0x14f)]=function(){const _0xff9c7f=_0x2beff5;return Window_BTB_TurnOrder[_0xff9c7f(0x3a4)][_0xff9c7f(0x366)];},Game_BattlerBase[_0x2beff5(0x2fe)]['TurnOrderBTBGraphicFaceName']=function(){const _0x26e20f=_0x2beff5;return this[_0x26e20f(0x1a7)]===undefined&&(this[_0x26e20f(0x1a7)]=this[_0x26e20f(0x2ad)]()),this[_0x26e20f(0x1a7)];},Game_BattlerBase[_0x2beff5(0x2fe)]['createTurnOrderBTBGraphicFaceName']=function(){const _0x5247f1=_0x2beff5;return Window_BTB_TurnOrder[_0x5247f1(0x3a4)][_0x5247f1(0x2f4)];},Game_BattlerBase['prototype']['TurnOrderBTBGraphicFaceIndex']=function(){const _0x30f41f=_0x2beff5;return this[_0x30f41f(0x13f)]===undefined&&(this[_0x30f41f(0x13f)]=this[_0x30f41f(0x1c8)]()),this[_0x30f41f(0x13f)];},Game_BattlerBase[_0x2beff5(0x2fe)]['createTurnOrderBTBGraphicFaceIndex']=function(){const _0x7eba16=_0x2beff5;return Window_BTB_TurnOrder[_0x7eba16(0x3a4)][_0x7eba16(0x281)];},Game_BattlerBase[_0x2beff5(0x2fe)][_0x2beff5(0x176)]=function(){const _0x5a08fe=_0x2beff5;if(this[_0x5a08fe(0x208)]===undefined){if(_0x5a08fe(0x3b7)===_0x5a08fe(0x3b7))this[_0x5a08fe(0x208)]=this[_0x5a08fe(0x35d)]();else{const _0x5c1568=this[_0x5a08fe(0x1dd)]();if(!_0x5c1568)return;if(this[_0x5a08fe(0x19c)]===_0x5c1568['isAlive']()&&this[_0x5a08fe(0x1e7)]===_0x5c1568[_0x5a08fe(0x211)]())return;this['_isAlive']=_0x5c1568[_0x5a08fe(0x1a5)](),this[_0x5a08fe(0x1e7)]=_0x5c1568['isAppeared']();let _0x3a3b0c=this[_0x5a08fe(0x19c)]&&this[_0x5a08fe(0x1e7)]?0xff:0x0;this[_0x5a08fe(0x152)](_0x3a3b0c);}}return this['_btbTurnOrderIconIndex'];},Game_BattlerBase[_0x2beff5(0x2fe)][_0x2beff5(0x35d)]=function(){const _0xe9a380=_0x2beff5;return Window_BTB_TurnOrder[_0xe9a380(0x3a4)][_0xe9a380(0x338)];},Game_BattlerBase[_0x2beff5(0x2fe)]['setBTBGraphicIconIndex']=function(_0x58e331){const _0x423c27=_0x2beff5;this[_0x423c27(0x208)]=_0x58e331;},VisuMZ['BattleSystemBTB']['Game_BattlerBase_hide']=Game_BattlerBase[_0x2beff5(0x2fe)]['hide'],Game_BattlerBase[_0x2beff5(0x2fe)][_0x2beff5(0x289)]=function(){const _0x544c9c=_0x2beff5;VisuMZ[_0x544c9c(0x39a)][_0x544c9c(0x2c1)][_0x544c9c(0x354)](this),BattleManager[_0x544c9c(0x1b9)]();},VisuMZ[_0x2beff5(0x39a)][_0x2beff5(0x391)]=Game_BattlerBase['prototype'][_0x2beff5(0x29a)],Game_BattlerBase[_0x2beff5(0x2fe)][_0x2beff5(0x29a)]=function(){const _0x1327a2=_0x2beff5;VisuMZ[_0x1327a2(0x39a)][_0x1327a2(0x391)][_0x1327a2(0x354)](this),BattleManager['removeActionBattlersBTB']();},VisuMZ[_0x2beff5(0x39a)][_0x2beff5(0x282)]=Game_Battler[_0x2beff5(0x2fe)][_0x2beff5(0x295)],Game_Battler[_0x2beff5(0x2fe)][_0x2beff5(0x295)]=function(){const _0x51df48=_0x2beff5;VisuMZ[_0x51df48(0x39a)]['Game_Battler_performCollapse'][_0x51df48(0x354)](this),BattleManager['removeActionBattlersBTB']();},VisuMZ[_0x2beff5(0x39a)][_0x2beff5(0x2e9)]=Game_Battler[_0x2beff5(0x2fe)][_0x2beff5(0x2c7)],Game_Battler[_0x2beff5(0x2fe)][_0x2beff5(0x2c7)]=function(){const _0x2ef8ef=_0x2beff5;if(BattleManager[_0x2ef8ef(0x157)]())return 0x1;else{if(_0x2ef8ef(0x1b5)===_0x2ef8ef(0x1b5))return VisuMZ[_0x2ef8ef(0x39a)]['Game_Battler_makeActionTimes']['call'](this);else{const _0xa2b933=this[_0x2ef8ef(0x278)]();if(!_0xa2b933)return;let _0x59c3e0=![];if(this[_0x2ef8ef(0x270)]!==_0xa2b933[_0x2ef8ef(0x3cb)])_0x59c3e0=!![];else this[_0x2ef8ef(0x2a0)]!==_0xa2b933[_0x2ef8ef(0x22d)]&&(_0x59c3e0=!![]);_0x59c3e0&&this[_0x2ef8ef(0x1d6)]();}}},VisuMZ[_0x2beff5(0x39a)][_0x2beff5(0x2ae)]=Game_Battler[_0x2beff5(0x2fe)][_0x2beff5(0x21c)],Game_Battler[_0x2beff5(0x2fe)][_0x2beff5(0x21c)]=function(_0x2c7de1){const _0xe73059=_0x2beff5;VisuMZ[_0xe73059(0x39a)][_0xe73059(0x2ae)][_0xe73059(0x354)](this,_0x2c7de1),this['onBattleStartBTB'](_0x2c7de1);},Game_Battler['prototype']['onBattleStartBTB']=function(_0x529966){const _0x22a119=_0x2beff5;if(!BattleManager[_0x22a119(0x157)]())return;const _0x8b49d5=VisuMZ[_0x22a119(0x39a)][_0x22a119(0x3a4)][_0x22a119(0x23b)],_0x37f4b4=VisuMZ[_0x22a119(0x39a)][_0x22a119(0x145)];let _0x56e3dc=_0x529966?_0x8b49d5[_0x22a119(0x192)]:_0x8b49d5['BravePointStartNeutral'];const _0x182d50=this['traitObjects']();for(const _0x2754e9 of _0x182d50){if(!_0x2754e9)continue;const _0x527113=_0x2754e9[_0x22a119(0x127)];if(_0x527113[_0x22a119(0x28e)](_0x37f4b4[_0x22a119(0x1f7)])){if(_0x22a119(0x2b4)===_0x22a119(0x3c6)){const _0x385564=arguments[0x0],_0x30ce6a=arguments[0x1],_0x3fc58d=arguments[0x2];_0x385564['x']=_0x437793[_0x22a119(0x3ad)](_0x30ce6a[_0x22a119(0x3cb)]/0x2),_0x385564['y']=0x0,_0x385564['anchor']['x']=0.5,_0x385564[_0x22a119(0x303)]['y']=0.5;const _0x4ebe0f=_0x5e9e9d[_0x22a119(0x17b)],_0x1fd5c3=_0x14cc44[_0x22a119(0x14c)];let _0x2fd8e8=_0x4ebe0f[_0x22a119(0x291)](_0x3fc58d[_0x22a119(0x2a5)]());const _0x250c5e=_0x3fc58d[_0x22a119(0x19d)];_0x2fd8e8=_0x2fd8e8[_0x22a119(0x141)](0x0,_0x250c5e)+_0x1fd5c3+_0x2fd8e8[_0x22a119(0x141)](_0x250c5e+0x1);const _0x43510b=new _0x46fb66(_0x30ce6a[_0x22a119(0x3cb)],_0x30ce6a[_0x22a119(0x373)]());_0x43510b[_0x22a119(0x30a)]=0x24,_0x43510b[_0x22a119(0x335)](_0x2fd8e8,0x0,0x0,_0x43510b[_0x22a119(0x3cb)],_0x43510b['height'],_0x22a119(0x32a)),_0x385564['bitmap']=_0x43510b;}else _0x56e3dc+=Number(RegExp['$1']);}}this[_0x22a119(0x26c)](_0x56e3dc);},Game_Battler['prototype'][_0x2beff5(0x24d)]=function(){const _0x200082=_0x2beff5;this[_0x200082(0x15a)][_0x200082(0x301)](new Game_Action(this));const _0x4e638c=VisuMZ[_0x200082(0x39a)][_0x200082(0x3a4)]['BraveAnimation'];if(_0x4e638c[_0x200082(0x290)]){if('fZaLj'!==_0x200082(0x315)){const _0x279b6f='Brave',_0x4f2af8=_0x4e638c['%1AnimationID'[_0x200082(0x13d)](_0x279b6f)],_0xe35794=_0x4e638c[_0x200082(0x136)[_0x200082(0x13d)](_0x279b6f)],_0x2f4fda=_0x4e638c[_0x200082(0x2b9)[_0x200082(0x13d)](_0x279b6f)];$gameTemp[_0x200082(0x112)]([this],_0x4f2af8,_0xe35794,_0x2f4fda);}else{const _0x1fc502=this[_0x200082(0x394)]()[_0x200082(0x127)];if(_0x1fc502[_0x200082(0x28e)](/<BTB TURN ORDER FACE:[ ](.*),[ ](\d+)>/i))return _0x26a1a0(_0x493336['$1']);return this[_0x200082(0x2e3)]();}}},Game_Battler[_0x2beff5(0x2fe)][_0x2beff5(0x3d2)]=function(){const _0x1f4476=_0x2beff5;if(this['_actions']['length']<=0x1)return;this[_0x1f4476(0x15a)]['pop']();const _0x27ad4d=VisuMZ[_0x1f4476(0x39a)]['Settings'][_0x1f4476(0x166)];if(_0x27ad4d[_0x1f4476(0x195)]){if('uqqtT'===_0x1f4476(0x15c)){const _0x2ae4fa=_0x1f4476(0x389),_0x51d3eb=_0x27ad4d[_0x1f4476(0x1d5)['format'](_0x2ae4fa)],_0x31bcb9=_0x27ad4d['%1Mirror'['format'](_0x2ae4fa)],_0xdb8ffa=_0x27ad4d['%1Mute'[_0x1f4476(0x13d)](_0x2ae4fa)];$gameTemp[_0x1f4476(0x112)]([this],_0x51d3eb,_0x31bcb9,_0xdb8ffa);}else _0x2a4c19[_0x1f4476(0x301)](_0x1bbf93+'-'+_0x17a29e[_0x57bd0d]),_0xcd6ce2(_0x5cf7d1+'-'+_0x34dd5c[_0x32f41a],_0x3342a5['slice'](_0x5d42dd+0x1));}},VisuMZ[_0x2beff5(0x39a)][_0x2beff5(0x18c)]=Game_Battler[_0x2beff5(0x2fe)][_0x2beff5(0x2ff)],Game_Battler[_0x2beff5(0x2fe)][_0x2beff5(0x2ff)]=function(){const _0x5be863=_0x2beff5;VisuMZ[_0x5be863(0x39a)]['Game_Battler_onTurnEnd'][_0x5be863(0x354)](this),this[_0x5be863(0x283)]();},Game_Battler[_0x2beff5(0x2fe)][_0x2beff5(0x283)]=function(){const _0x41870a=_0x2beff5;if(!BattleManager[_0x41870a(0x157)]())return;if(!$gameParty[_0x41870a(0x36f)]())return;this[_0x41870a(0x215)]();},Game_Battler['prototype'][_0x2beff5(0x215)]=function(){const _0x549366=_0x2beff5,_0xff2a5d=VisuMZ[_0x549366(0x39a)][_0x549366(0x3a4)][_0x549366(0x23b)],_0x86e1b6=_0xff2a5d[_0x549366(0x36b)];if(_0x86e1b6&&!this[_0x549366(0x1a5)]())return;const _0x46dfd4=this[_0x549366(0x2f6)]();this['gainBravePoints'](_0x46dfd4);},Game_Battler['prototype'][_0x2beff5(0x2f6)]=function(){const _0x93e04e=_0x2beff5,_0xcdc8f4=VisuMZ[_0x93e04e(0x39a)][_0x93e04e(0x145)],_0x334a5e=VisuMZ[_0x93e04e(0x39a)][_0x93e04e(0x3a4)][_0x93e04e(0x23b)];let _0x26e6eb=_0x334a5e['BravePointRegenBase']||0x0;const _0x527488=this['traitObjects']();for(const _0xcda072 of _0x527488){if(_0x93e04e(0x1c3)==='ACaqL'){if(!_0xcda072)continue;const _0x429c7e=_0xcda072[_0x93e04e(0x127)];_0x429c7e[_0x93e04e(0x28e)](_0xcdc8f4[_0x93e04e(0x26b)])&&(_0x26e6eb+=Number(RegExp['$1']));}else this[_0x93e04e(0x26f)]=_0x43cd33[_0x93e04e(0x1a5)]()&&_0x2e2667[_0x93e04e(0x211)]()?0xff:0x0;}return _0x26e6eb;},Game_Battler[_0x2beff5(0x2fe)][_0x2beff5(0x220)]=function(){const _0x43fc2b=_0x2beff5;if(!this['canProcessActionFusionsBTB']())return;if(this[_0x43fc2b(0x2a5)]()<=0x1)return;if(!this[_0x43fc2b(0x3c5)]())return;if(!this[_0x43fc2b(0x3c5)]()['item']())return;const _0x1bfabe=this['getActionFusionCombinationsBTB']();if(_0x1bfabe[_0x43fc2b(0x2f9)]<=0x0)return;let _0x195881='',_0x549cbb=0x0;const _0xee4106=this[_0x43fc2b(0x3c5)]()[_0x43fc2b(0x21d)](),_0x2e609c=_0xee4106?DataManager[_0x43fc2b(0x312)]:DataManager[_0x43fc2b(0x1a4)],_0x365dfd=_0xee4106?DataManager[_0x43fc2b(0x268)]:DataManager[_0x43fc2b(0x362)];for(const _0x34f63c of _0x1bfabe){if(!_0x34f63c)continue;_0x2e609c[_0x34f63c]&&_0x2e609c[_0x34f63c]>=_0x549cbb&&(this['canPayActionFusionCombination'](_0x34f63c)&&(_0x195881=_0x34f63c,_0x549cbb=_0x2e609c[_0x34f63c]));if(_0x365dfd[_0x34f63c]&&_0x365dfd[_0x34f63c]>=_0x549cbb){if('AFzSE'!=='FJMzD'){if(this[_0x43fc2b(0x2af)](_0x34f63c)){if(_0x43fc2b(0x18e)!==_0x43fc2b(0x2cf))_0x195881=_0x34f63c,_0x549cbb=_0x2e609c[_0x34f63c];else{if(!_0xb8d20c[_0x43fc2b(0x157)]())return![];if(!_0x34857e[_0x43fc2b(0x39a)][_0x43fc2b(0x3a4)][_0x43fc2b(0x20c)][_0x43fc2b(0x3af)])return![];if(this[_0x43fc2b(0x163)]&&this[_0x43fc2b(0x163)][_0x43fc2b(0x147)]())return![];return!![];}}}else _0x595150[_0x43fc2b(0x354)](this,this['_btbActionSprite'],this,this['_actor']);}}if(_0x549cbb<=0x0)return;this[_0x43fc2b(0x21a)](_0x195881),this[_0x43fc2b(0x3c5)]()[_0x43fc2b(0x352)](_0x195881),_0xee4106?_0x43fc2b(0x36e)==='oOASX'?this[_0x43fc2b(0x3c5)]()[_0x43fc2b(0x3a8)](_0x549cbb):(_0x2b243f=_0x43fc2b(0x236)[_0x43fc2b(0x13d)](_0x52bbba,_0x2fd211[_0x43fc2b(0x274)]()['id']),_0x340659[_0x43fc2b(0x301)](_0x1610c8)):this[_0x43fc2b(0x3c5)]()[_0x43fc2b(0x198)](_0x549cbb);},Game_Battler[_0x2beff5(0x2fe)][_0x2beff5(0x39f)]=function(){const _0x4bdee6=_0x2beff5;if(this[_0x4bdee6(0x2ed)]())return![];const _0x49d63c=VisuMZ[_0x4bdee6(0x39a)]['Settings'][_0x4bdee6(0x23b)];if(this[_0x4bdee6(0x336)]()){if(_0x49d63c[_0x4bdee6(0x1e5)]===undefined)return!![];return _0x49d63c[_0x4bdee6(0x1e5)];}else{if('pHdtK'===_0x4bdee6(0x248)){const _0x2abd2d=_0x47d605['actor']();if(!_0x2abd2d)return;_0x2abd2d[_0x4bdee6(0x3d2)]();const _0x588bd3=this[_0x4bdee6(0x3a7)][_0x4bdee6(0x353)],_0x35cabd=this[_0x4bdee6(0x3a7)]['_scrollY'],_0x493a4c=this[_0x4bdee6(0x3a7)]['index']();this[_0x4bdee6(0x3a7)][_0x4bdee6(0x2a7)](_0x2abd2d),this[_0x4bdee6(0x3a7)][_0x4bdee6(0x2cd)](_0x493a4c),this[_0x4bdee6(0x3a7)]['_scrollX']=_0x588bd3,this[_0x4bdee6(0x3a7)][_0x4bdee6(0x2dd)]=_0x35cabd;}else{if(_0x49d63c[_0x4bdee6(0x259)]===undefined)return!![];return _0x49d63c['EnemyActionFusions'];}}},Game_BattlerBase[_0x2beff5(0x2fe)]['cannotFusionNotetagBTB']=function(){const _0x9ecfde=_0x2beff5,_0x26caaf=VisuMZ[_0x9ecfde(0x39a)]['RegExp'],_0x19e949=this['traitObjects']();for(const _0x273ce0 of _0x19e949){if(_0x9ecfde(0x280)!==_0x9ecfde(0x221)){if(!_0x273ce0)continue;const _0x447ded=_0x273ce0[_0x9ecfde(0x127)];if(_0x447ded[_0x9ecfde(0x28e)](_0x26caaf[_0x9ecfde(0x3c4)]))return!![];if(_0x447ded[_0x9ecfde(0x28e)](_0x26caaf[_0x9ecfde(0x3ae)]))return![];}else this[_0x9ecfde(0x1d6)]();}return![];},Game_Battler['prototype'][_0x2beff5(0x347)]=function(){const _0x4880b9=_0x2beff5,_0xe337ca=this[_0x4880b9(0x3c5)](),_0x1eec6a=this[_0x4880b9(0x15a)],_0x5eb699=_0x1eec6a[_0x4880b9(0x307)](_0x4f3e76=>this['canActionFusionWithBTB'](_0xe337ca,_0x4f3e76)),_0x4331c9=_0x5eb699[_0x4880b9(0x2fd)](_0x2424ee=>_0x2424ee['item']()['id']),_0x3fde4c=VisuMZ[_0x4880b9(0x39a)]['formFlexCombo'](_0xe337ca[_0x4880b9(0x274)]()['id'],_0x4331c9);let _0x415d6e=String(_0xe337ca[_0x4880b9(0x274)]()['id']);for(let _0x3e2660=0x1;_0x3e2660<_0x1eec6a[_0x4880b9(0x2f9)];_0x3e2660++){if('aFgJN'!=='aFgJN'){if(_0x532a08&&_0x5ab8e8[_0x4880b9(0x249)]()&&_0xac3a80[_0x4880b9(0x157)]()){const _0x959c68=this[_0x4880b9(0x134)](_0x49c1d1);if(this[_0x4880b9(0x253)]()-_0x959c68<this['minBravePoints']())return![];}return _0x1fe777[_0x4880b9(0x39a)][_0x4880b9(0x3d5)][_0x4880b9(0x354)](this,_0x47d99f);}else{const _0x1440eb=_0x1eec6a[_0x3e2660];if(this[_0x4880b9(0x340)](_0xe337ca,_0x1440eb))_0x415d6e=_0x4880b9(0x236)[_0x4880b9(0x13d)](_0x415d6e,_0x1440eb[_0x4880b9(0x274)]()['id']),_0x3fde4c['push'](_0x415d6e);else break;}}return _0x3fde4c[_0x4880b9(0x307)]((_0x187af3,_0x2be64c,_0x362540)=>_0x362540[_0x4880b9(0x3c7)](_0x187af3)===_0x2be64c);},VisuMZ[_0x2beff5(0x39a)]['formFlexCombo']=function(_0x772433,_0x7697d4){const _0x3bf9a9=[],_0x2fb3d9=function(_0x3b6d05,_0x45bab7){const _0x5c130a=_0x5849;for(var _0x217adb=0x0;_0x217adb<_0x45bab7[_0x5c130a(0x2f9)];_0x217adb++){_0x3bf9a9['push'](_0x3b6d05+'-'+_0x45bab7[_0x217adb]),_0x2fb3d9(_0x3b6d05+'-'+_0x45bab7[_0x217adb],_0x45bab7[_0x5c130a(0x25e)](_0x217adb+0x1));}};return _0x2fb3d9(_0x772433,_0x7697d4),_0x3bf9a9;},Game_Battler[_0x2beff5(0x2fe)][_0x2beff5(0x340)]=function(_0x1d2afe,_0x208a50){const _0x3593b0=_0x2beff5;if(!_0x1d2afe||!_0x208a50)return![];if(_0x1d2afe===_0x208a50)return![];if(!_0x1d2afe[_0x3593b0(0x274)]()||!_0x208a50['item']())return![];if(_0x1d2afe['isSkill']()!==_0x208a50['isSkill']())return![];return!![];},Game_Battler[_0x2beff5(0x2fe)][_0x2beff5(0x2af)]=function(_0x68d852){const _0x209e88=_0x2beff5,_0xdfd522=this[_0x209e88(0x3c5)]()['isSkill'](),_0x39c475=JsonEx[_0x209e88(0x1fc)](this);_0x39c475[_0x209e88(0x339)]=!![],_0x39c475[_0x209e88(0x3c5)]()[_0x209e88(0x352)](_0x68d852);if(_0xdfd522)return _0x39c475[_0x209e88(0x123)]();else{const _0x1b8e91=JsonEx['makeDeepCopy']($gameParty[_0x209e88(0x3ca)]),_0x45af68=JsonEx[_0x209e88(0x1fc)]($gameParty[_0x209e88(0x3b5)]),_0x144ee5=JsonEx[_0x209e88(0x1fc)]($gameParty[_0x209e88(0x1f9)]);let _0x2ec21f=_0x39c475[_0x209e88(0x1b2)]();return $gameParty[_0x209e88(0x3ca)]=_0x1b8e91,$gameParty[_0x209e88(0x3b5)]=_0x45af68,$gameParty[_0x209e88(0x1f9)]=_0x144ee5,_0x2ec21f;}},Game_Battler['prototype'][_0x2beff5(0x21a)]=function(_0xa8e9e6){const _0x53ad5e=_0x2beff5,_0x280461=this[_0x53ad5e(0x3c5)](),_0x4bbd5f=_0xa8e9e6[_0x53ad5e(0x25c)]('-')['map'](_0x311088=>Number(_0x311088));_0x4bbd5f[_0x53ad5e(0x1a9)]();const _0x298180=this[_0x53ad5e(0x15a)],_0x330d07=[];for(const _0x8bf184 of _0x298180){if(this[_0x53ad5e(0x340)](_0x280461,_0x8bf184)){if(_0x53ad5e(0x378)==='tfXsc'){if(_0x4bbd5f['includes'](_0x8bf184[_0x53ad5e(0x274)]()['id'])){if(_0x53ad5e(0x327)!==_0x53ad5e(0x327))return _0x301723['x']-_0x13fe00['x'];else _0x330d07[_0x53ad5e(0x301)](_0x8bf184),_0x4bbd5f[_0x53ad5e(0x164)](_0x4bbd5f['indexOf'](_0x8bf184[_0x53ad5e(0x274)]()['id']),0x1);}}else this['x']=this['_homeX'],this['y']=this['_homeY'];}}for(const _0x1de24d of _0x330d07){_0x298180[_0x53ad5e(0x3d8)](_0x1de24d);}},Game_Actor[_0x2beff5(0x2fe)][_0x2beff5(0x26c)]=function(_0x26ea96){const _0x32f7b4=_0x2beff5;Game_Battler[_0x32f7b4(0x2fe)][_0x32f7b4(0x26c)]['call'](this,_0x26ea96);if(!SceneManager[_0x32f7b4(0x249)]())return;if(!BattleManager[_0x32f7b4(0x357)]()['includes'](this))return;BattleManager[_0x32f7b4(0x3e0)]();},VisuMZ['BattleSystemBTB'][_0x2beff5(0x1f3)]=Game_Actor[_0x2beff5(0x2fe)][_0x2beff5(0x15d)],Game_Actor[_0x2beff5(0x2fe)][_0x2beff5(0x15d)]=function(){const _0x3daa76=_0x2beff5;VisuMZ[_0x3daa76(0x39a)][_0x3daa76(0x1f3)]['call'](this),BattleManager['isBTB']()&&this[_0x3daa76(0x253)]()<0x0&&this[_0x3daa76(0x39d)]();},Game_Actor['prototype'][_0x2beff5(0x14f)]=function(){const _0x144e58=_0x2beff5,_0x2b23a8=this[_0x144e58(0x394)]()['note'];if(_0x2b23a8[_0x144e58(0x28e)](/<BTB TURN ORDER FACE:[ ](.*),[ ](\d+)>/i))return _0x144e58(0x175)===_0x144e58(0x168)?_0x144e58(0x34e):_0x144e58(0x234);else{if(_0x2b23a8[_0x144e58(0x28e)](/<BTB TURN ORDER ICON:[ ](\d+)>/i))return _0x144e58(0x34e);}return Window_BTB_TurnOrder[_0x144e58(0x3a4)][_0x144e58(0x2f7)];},Game_Actor[_0x2beff5(0x2fe)][_0x2beff5(0x2ad)]=function(){const _0x5b3651=_0x2beff5,_0xa8311f=this[_0x5b3651(0x394)]()[_0x5b3651(0x127)];if(_0xa8311f[_0x5b3651(0x28e)](/<BTB TURN ORDER FACE:[ ](.*),[ ](\d+)>/i))return String(RegExp['$1']);return this[_0x5b3651(0x2e3)]();},Game_Actor[_0x2beff5(0x2fe)][_0x2beff5(0x1c8)]=function(){const _0xc06925=_0x2beff5,_0x2bb32e=this[_0xc06925(0x394)]()[_0xc06925(0x127)];if(_0x2bb32e[_0xc06925(0x28e)](/<BTB TURN ORDER FACE:[ ](.*),[ ](\d+)>/i))return Number(RegExp['$2']);return this[_0xc06925(0x330)]();},Game_Actor[_0x2beff5(0x2fe)]['createTurnOrderBTBGraphicIconIndex']=function(){const _0x5aa2de=_0x2beff5,_0x16232d=this[_0x5aa2de(0x394)]()[_0x5aa2de(0x127)];if(_0x16232d[_0x5aa2de(0x28e)](/<BTB TURN ORDER ICON:[ ](\d+)>/i))return Number(RegExp['$1']);return Window_BTB_TurnOrder[_0x5aa2de(0x3a4)]['ActorBattlerIcon'];},Game_Actor['prototype'][_0x2beff5(0x340)]=function(_0x4f75c7,_0x1e13db){const _0xf52adc=_0x2beff5;if(!Game_Battler[_0xf52adc(0x2fe)]['canActionFusionWithBTB'][_0xf52adc(0x354)](this,_0x4f75c7,_0x1e13db))return![];if(_0x4f75c7[_0xf52adc(0x21f)]()&&_0x1e13db[_0xf52adc(0x21f)]()){if(_0xf52adc(0x351)!==_0xf52adc(0x351)){_0x4dc996[_0xf52adc(0x305)]=!![];let _0x45a2b9=_0x28f5fe[_0xf52adc(0x1cd)]();const _0x497980=_0x25a977[_0xf52adc(0x39a)][_0xf52adc(0x3a4)][_0xf52adc(0x166)],_0xfcf52a=_0x497980[_0xf52adc(0x290)],_0x702a72=_0x497980[_0xf52adc(0x23d)];while(_0x45a2b9--){this[_0xf52adc(0x301)]('showNormalAnimation',[_0x2fc96b],_0xfcf52a),_0x45a2b9>0x0?this['push'](_0xf52adc(0x160),_0x702a72):this[_0xf52adc(0x301)](_0xf52adc(0x2e1));}this[_0xf52adc(0x301)](_0xf52adc(0x365),_0x20c235,_0x55947e,_0x1237c6);}else{if(_0x4f75c7[_0xf52adc(0x355)]()!==_0x1e13db[_0xf52adc(0x355)]())return![];if(_0x4f75c7[_0xf52adc(0x14b)]!==_0x1e13db[_0xf52adc(0x14b)])return![];}}return!![];},Game_Enemy['prototype'][_0x2beff5(0x14f)]=function(){const _0xd0910a=_0x2beff5,_0x241b52=this['enemy']()['note'];if(_0x241b52[_0xd0910a(0x28e)](/<BTB TURN ORDER FACE:[ ](.*),[ ](\d+)>/i))return _0xd0910a(0x234);else{if(_0x241b52['match'](/<BTB TURN ORDER ICON:[ ](\d+)>/i))return _0xd0910a(0x34e);}return Window_BTB_TurnOrder[_0xd0910a(0x3a4)][_0xd0910a(0x366)];},Game_Enemy[_0x2beff5(0x2fe)]['createTurnOrderBTBGraphicFaceName']=function(){const _0x43547e=_0x2beff5,_0x1a93de=this['enemy']()['note'];if(_0x1a93de[_0x43547e(0x28e)](/<BTB TURN ORDER FACE:[ ](.*),[ ](\d+)>/i))return String(RegExp['$1']);return Window_BTB_TurnOrder['Settings'][_0x43547e(0x2f4)];},Game_Enemy['prototype'][_0x2beff5(0x1c8)]=function(){const _0x4be2e9=_0x2beff5,_0x1e838e=this['enemy']()[_0x4be2e9(0x127)];if(_0x1e838e[_0x4be2e9(0x28e)](/<BTB TURN ORDER FACE:[ ](.*),[ ](\d+)>/i)){if('poUQZ'==='poUQZ')return Number(RegExp['$2']);else this[_0x4be2e9(0x143)]=this[_0x4be2e9(0x346)]=_0xc66a51['x'],this['_targetHomeY']=this[_0x4be2e9(0x2f8)]=_0xcb6d22['y'],this['_fullWidth']=_0x1b63ca['width'],this[_0x4be2e9(0x118)]=_0x16175f['height'],this['_homeDuration']=0x0;}return Window_BTB_TurnOrder[_0x4be2e9(0x3a4)][_0x4be2e9(0x281)];},Game_Enemy[_0x2beff5(0x2fe)]['createTurnOrderBTBGraphicIconIndex']=function(){const _0x5d138e=_0x2beff5,_0x45b968=this[_0x5d138e(0x3a6)]()[_0x5d138e(0x127)];if(_0x45b968[_0x5d138e(0x28e)](/<BTB TURN ORDER ICON:[ ](\d+)>/i))return Number(RegExp['$1']);return Window_BTB_TurnOrder['Settings']['EnemyBattlerIcon'];},VisuMZ[_0x2beff5(0x39a)][_0x2beff5(0x121)]=Game_Enemy[_0x2beff5(0x2fe)]['makeActions'],Game_Enemy['prototype'][_0x2beff5(0x15d)]=function(){const _0x492564=_0x2beff5;VisuMZ[_0x492564(0x39a)]['Game_Enemy_makeActions'][_0x492564(0x354)](this),this[_0x492564(0x2eb)](),this[_0x492564(0x368)]();},Game_Enemy[_0x2beff5(0x2fe)][_0x2beff5(0x2eb)]=function(){const _0x53a1b7=_0x2beff5;if(!BattleManager[_0x53a1b7(0x157)]())return;if(this[_0x53a1b7(0x2a5)]()<=0x0)return;this[_0x53a1b7(0x305)]=![];if(this[_0x53a1b7(0x253)]()<0x0){if('oKotP'!==_0x53a1b7(0x30f))this['clearActions']();else{const _0x137746=_0x31227a['Settings'];if(['top'][_0x53a1b7(0x359)](_0x137746[_0x53a1b7(0x214)]))return;this['x']=this[_0x53a1b7(0x346)],this['y']=this[_0x53a1b7(0x2f8)];const _0x51f5b4=_0x4cd76b['_scene']['_windowLayer'];this['x']+=_0x51f5b4['x'],this['y']+=_0x51f5b4['y'];}}},Game_Enemy[_0x2beff5(0x2fe)][_0x2beff5(0x368)]=function(){const _0x130b22=_0x2beff5;if(!BattleManager[_0x130b22(0x157)]())return;if(this['numActions']()<=0x0)return;const _0x578734=this[_0x130b22(0x15a)][0x0];if(!_0x578734)return;const _0x498eee=_0x578734[_0x130b22(0x274)]();if(!_0x498eee)return;const _0x166502=VisuMZ[_0x130b22(0x39a)][_0x130b22(0x145)],_0x55f371=_0x498eee[_0x130b22(0x127)];let _0x14181c=[];if(_0x55f371['match'](_0x166502[_0x130b22(0x137)])){if(_0x130b22(0x225)==='VZYMG'){const _0x35674c=String(RegExp['$1'])[_0x130b22(0x25c)](',');for(let _0x547f14 of _0x35674c){_0x547f14=(String(_0x547f14)||'')[_0x130b22(0x1a1)]();const _0x5373eb=/^\d+$/[_0x130b22(0x2a4)](_0x547f14);_0x5373eb?_0x14181c[_0x130b22(0x301)](Number(_0x547f14)):'Jijux'!=='Jijux'?(this[_0x130b22(0x185)]=_0x536d3a[_0x130b22(0x32d)](),_0x5129a1=_0x55c667[_0x130b22(0x2c6)](this[_0x130b22(0x185)]),_0x20bc20[_0x130b22(0x1a8)](this['changeEnemyGraphicBitmap']['bind'](this,_0x5d6108))):_0x14181c[_0x130b22(0x301)](DataManager['getSkillIdWithName'](_0x547f14));}}else{const _0x49ac43=_0x42ef24[_0x130b22(0x3a4)],_0x1e75e6=this['bitmapWidth'](),_0x2f0ae5=this[_0x130b22(0x3df)](),_0x1c1e70=_0x2ab50c[_0x130b22(0x25d)](_0x1e75e6,_0x2f0ae5);this['_graphicSprite'][_0x130b22(0x2e5)]=new _0x1b98e1(_0x1e75e6,_0x2f0ae5);const _0x1e05fc=this['_graphicSprite'][_0x130b22(0x2e5)],_0x29693d=_0x4ab108[_0x130b22(0x25d)](0x1,_0x1c1e70/_0x1809d7[_0x130b22(0x3cb)],_0x1c1e70/_0x13ef3f['height']),_0x5598fd=_0x75904e['width']*_0x29693d,_0x12971f=_0x5e2648[_0x130b22(0x22d)]*_0x29693d,_0x5830aa=_0x2e6d69[_0x130b22(0x3ad)]((_0x1e75e6-_0x5598fd)/0x2),_0x5b2464=_0x3ddede[_0x130b22(0x3ad)]((_0x2f0ae5-_0x12971f)/0x2);_0x1e05fc['blt'](_0x4153db,0x0,0x0,_0x108ee1[_0x130b22(0x3cb)],_0x529c55[_0x130b22(0x22d)],_0x5830aa,_0x5b2464,_0x5598fd,_0x12971f);}}if(_0x14181c['length']<=0x0)return;while(_0x14181c[_0x130b22(0x2f9)]>this[_0x130b22(0x159)]()){_0x14181c[_0x130b22(0x218)]();}if(_0x14181c['length']<=0x0)return;this[_0x130b22(0x39d)]();for(const _0x4fd00b of _0x14181c){if(_0x130b22(0x2bd)===_0x130b22(0x190))return _0x27491e[_0x130b22(0x39a)][_0x130b22(0x1ac)][_0x130b22(0x354)](this);else{const _0x43a773=new Game_Action(this);_0x43a773[_0x130b22(0x3a8)](_0x4fd00b),_0x43a773[_0x130b22(0x300)]=!![],this[_0x130b22(0x15a)][_0x130b22(0x301)](_0x43a773);}}},Game_Enemy['prototype'][_0x2beff5(0x1cd)]=function(){const _0x1b2416=_0x2beff5;let _0xdd9726=this[_0x1b2416(0x2a5)]();for(const _0x3c4da9 of this[_0x1b2416(0x15a)]){if(_0x1b2416(0x1ec)!=='veUMO')this[_0x1b2416(0x1c4)](...arguments);else{if(!_0x3c4da9)continue;_0xdd9726+=_0x3c4da9[_0x1b2416(0x358)]();}}return _0xdd9726-0x1;},VisuMZ[_0x2beff5(0x39a)][_0x2beff5(0x219)]=Game_Unit[_0x2beff5(0x2fe)][_0x2beff5(0x15d)],Game_Unit['prototype']['makeActions']=function(){const _0x34fa21=_0x2beff5;VisuMZ[_0x34fa21(0x39a)][_0x34fa21(0x219)][_0x34fa21(0x354)](this),BattleManager[_0x34fa21(0x157)]()&&this===$gameTroop&&SceneManager[_0x34fa21(0x249)]()&&(_0x34fa21(0x37c)===_0x34fa21(0x229)?_0x1e04ad[_0x34fa21(0x3d8)](_0x2e22c1):BattleManager[_0x34fa21(0x1c0)]());},VisuMZ[_0x2beff5(0x39a)][_0x2beff5(0x151)]=Game_Party[_0x2beff5(0x2fe)][_0x2beff5(0x3a2)],Game_Party['prototype'][_0x2beff5(0x3a2)]=function(_0x21ec17){const _0x13c78d=_0x2beff5;VisuMZ[_0x13c78d(0x39a)][_0x13c78d(0x151)][_0x13c78d(0x354)](this,_0x21ec17),SceneManager[_0x13c78d(0x249)]()&&BattleManager[_0x13c78d(0x157)]()&&(_0x13c78d(0x2c3)===_0x13c78d(0x345)?this['_actor']&&!this[_0x13c78d(0x163)]['hideBraveTrait']()&&this[_0x13c78d(0x163)][_0x13c78d(0x1df)]()&&_0x40c759[_0x13c78d(0x1f5)][_0x13c78d(0x24d)]():BattleManager[_0x13c78d(0x2e8)][_0x13c78d(0x3d8)]($gameActors[_0x13c78d(0x394)](_0x21ec17)));},VisuMZ[_0x2beff5(0x39a)][_0x2beff5(0x35b)]=Scene_Battle[_0x2beff5(0x2fe)][_0x2beff5(0x1d3)],Scene_Battle['prototype'][_0x2beff5(0x1d3)]=function(){const _0x41feb7=_0x2beff5;BattleManager[_0x41feb7(0x157)]()?'nTRXh'!==_0x41feb7(0x251)?this[_0x41feb7(0x23a)]():this[_0x41feb7(0x1c2)]=_0x37beb5:VisuMZ[_0x41feb7(0x39a)][_0x41feb7(0x35b)][_0x41feb7(0x354)](this);},VisuMZ[_0x2beff5(0x39a)]['Scene_Battle_createActorCommandWindow']=Scene_Battle[_0x2beff5(0x2fe)]['createActorCommandWindow'],Scene_Battle[_0x2beff5(0x2fe)][_0x2beff5(0x113)]=function(){const _0x36a6dc=_0x2beff5;VisuMZ[_0x36a6dc(0x39a)]['Scene_Battle_createActorCommandWindow'][_0x36a6dc(0x354)](this),this[_0x36a6dc(0x119)]();},Scene_Battle['prototype'][_0x2beff5(0x119)]=function(){const _0x24d874=_0x2beff5;if(!BattleManager['isBTB']())return;const _0x2b672e=this[_0x24d874(0x3a7)];if(!_0x2b672e)return;_0x2b672e[_0x24d874(0x1fe)]('brave',this[_0x24d874(0x384)][_0x24d874(0x272)](this)),_0x2b672e[_0x24d874(0x1fe)](_0x24d874(0x2cb),this[_0x24d874(0x32e)]['bind'](this));},Scene_Battle['prototype'][_0x2beff5(0x384)]=function(){this['performBrave']();},Scene_Battle['prototype']['commandCancelBTB']=function(){const _0x48628e=_0x2beff5,_0x5f24ff=BattleManager[_0x48628e(0x394)]();if(!_0x5f24ff)this[_0x48628e(0x17e)]();else{if(_0x5f24ff[_0x48628e(0x2a5)]()<=0x1)this[_0x48628e(0x17e)]();else _0x5f24ff['_actionInputIndex']>0x0?this[_0x48628e(0x17e)]():this['reduceBrave']();}},Scene_Battle[_0x2beff5(0x2fe)][_0x2beff5(0x24d)]=function(){const _0xb9570b=_0x2beff5,_0x54e049=BattleManager[_0xb9570b(0x394)]();if(!_0x54e049)return;_0x54e049[_0xb9570b(0x24d)]();const _0x2fb5a5=this['_actorCommandWindow'][_0xb9570b(0x353)],_0x3ae036=this[_0xb9570b(0x3a7)][_0xb9570b(0x2dd)],_0x124f09=this['_actorCommandWindow'][_0xb9570b(0x3bb)]();this[_0xb9570b(0x3a7)][_0xb9570b(0x2a7)](_0x54e049),this[_0xb9570b(0x3a7)][_0xb9570b(0x2cd)](_0x124f09),this['_actorCommandWindow'][_0xb9570b(0x353)]=_0x2fb5a5,this[_0xb9570b(0x3a7)]['_scrollY']=_0x3ae036;},Scene_Battle[_0x2beff5(0x2fe)][_0x2beff5(0x3b6)]=function(){const _0xd79c48=_0x2beff5,_0x97df37=BattleManager[_0xd79c48(0x394)]();if(!_0x97df37)return;_0x97df37[_0xd79c48(0x3d2)]();const _0x1e1470=this[_0xd79c48(0x3a7)][_0xd79c48(0x353)],_0x145f78=this[_0xd79c48(0x3a7)][_0xd79c48(0x2dd)],_0x19fa9d=this[_0xd79c48(0x3a7)]['index']();this['_actorCommandWindow'][_0xd79c48(0x2a7)](_0x97df37),this[_0xd79c48(0x3a7)][_0xd79c48(0x2cd)](_0x19fa9d),this[_0xd79c48(0x3a7)][_0xd79c48(0x353)]=_0x1e1470,this[_0xd79c48(0x3a7)][_0xd79c48(0x2dd)]=_0x145f78;},VisuMZ[_0x2beff5(0x39a)]['Scene_Battle_createAllWindows']=Scene_Battle[_0x2beff5(0x2fe)]['createAllWindows'],Scene_Battle['prototype'][_0x2beff5(0x32f)]=function(){const _0x6d4237=_0x2beff5;VisuMZ['BattleSystemBTB'][_0x6d4237(0x204)]['call'](this),this['createBTBTurnOrderWindow']();},Scene_Battle[_0x2beff5(0x2fe)][_0x2beff5(0x117)]=function(){const _0x1120bd=_0x2beff5;if(!BattleManager[_0x1120bd(0x157)]())return;this['_btbTurnOrderWindow']=new Window_BTB_TurnOrder();const _0x39839b=this[_0x1120bd(0x271)](this[_0x1120bd(0x39b)]);this[_0x1120bd(0x284)](this['_btbTurnOrderWindow'],_0x39839b),this[_0x1120bd(0x361)](),BattleManager['updateTurnOrderBTB'](!![]);},Scene_Battle[_0x2beff5(0x2fe)]['repositionLogWindowBTB']=function(){const _0x38e2a4=_0x2beff5,_0x5e8c7f=Window_BTB_TurnOrder['Settings'];if(_0x5e8c7f[_0x38e2a4(0x214)]!==_0x38e2a4(0x29d))return;if(!_0x5e8c7f['RepositionLogWindow'])return;if(!this[_0x38e2a4(0x14a)])return;const _0x3887ca=this[_0x38e2a4(0x170)]['y']-Math[_0x38e2a4(0x3ad)]((Graphics[_0x38e2a4(0x22d)]-Graphics[_0x38e2a4(0x1c6)])/0x2),_0xc79401=_0x3887ca+this[_0x38e2a4(0x170)][_0x38e2a4(0x22d)];this[_0x38e2a4(0x14a)]['y']=_0xc79401+_0x5e8c7f[_0x38e2a4(0x10d)];};function Sprite_BTB_TurnOrder_Battler(){this['initialize'](...arguments);}Sprite_BTB_TurnOrder_Battler['prototype']=Object[_0x2beff5(0x1b6)](Sprite_Clickable[_0x2beff5(0x2fe)]),Sprite_BTB_TurnOrder_Battler[_0x2beff5(0x2fe)]['constructor']=Sprite_BTB_TurnOrder_Battler,Sprite_BTB_TurnOrder_Battler['prototype']['initialize']=function(_0x339432,_0x5cc661){const _0x2f68c6=_0x2beff5;this[_0x2f68c6(0x374)](_0x339432,_0x5cc661),Sprite_Clickable['prototype'][_0x2f68c6(0x1c4)][_0x2f68c6(0x354)](this),this[_0x2f68c6(0x217)]=0x0,this[_0x2f68c6(0x22a)](),this['checkOpacity']();},Sprite_BTB_TurnOrder_Battler[_0x2beff5(0x2fe)][_0x2beff5(0x374)]=function(_0x466f08,_0x1ab26b){const _0x5353ca=_0x2beff5;this[_0x5353ca(0x2a1)]=_0x466f08,this[_0x5353ca(0x2d0)]=_0x1ab26b;const _0x191f51=Window_BTB_TurnOrder[_0x5353ca(0x3a4)],_0x536e34=this[_0x5353ca(0x19f)](),_0x8746cd=this[_0x5353ca(0x2d8)]();this[_0x5353ca(0x231)]=0x0,this[_0x5353ca(0x1af)]=_0x536e34?_0x191f51['SpriteThin']*_0x8746cd:0x0,this[_0x5353ca(0x24c)]=_0x536e34?0x0:_0x191f51[_0x5353ca(0x1e8)]*_0x8746cd,this[_0x5353ca(0x11a)]=0x0,this[_0x5353ca(0x26f)]=0xff,this[_0x5353ca(0x19c)]=![],this[_0x5353ca(0x1e7)]=![],this[_0x5353ca(0x270)]=0x0,this[_0x5353ca(0x2a0)]=0x0;},Sprite_BTB_TurnOrder_Battler[_0x2beff5(0x2fe)]['createChildren']=function(){const _0x19fe56=_0x2beff5;this[_0x19fe56(0x2c9)](),this['createBackgroundSprite'](),this[_0x19fe56(0x393)](),this['createBorderSprite'](),this[_0x19fe56(0x19b)]();},Sprite_BTB_TurnOrder_Battler[_0x2beff5(0x2fe)][_0x2beff5(0x2c9)]=function(){const _0x182676=_0x2beff5;this['x']=this[_0x182676(0x1af)],this['y']=this['_positionTargetY'];},Sprite_BTB_TurnOrder_Battler['prototype']['isHorz']=function(){const _0x56aa65=_0x2beff5,_0x1cf10b=Window_BTB_TurnOrder[_0x56aa65(0x3a4)],_0x5ba50c=[_0x56aa65(0x29d),_0x56aa65(0x277)][_0x56aa65(0x359)](_0x1cf10b[_0x56aa65(0x214)]);return _0x5ba50c;},Sprite_BTB_TurnOrder_Battler['prototype'][_0x2beff5(0x38b)]=function(){const _0x21dd10=_0x2beff5,_0x29ec2c=Window_BTB_TurnOrder[_0x21dd10(0x3a4)];return this['isHorz']()?_0x29ec2c['SpriteThin']:_0x29ec2c[_0x21dd10(0x3a0)];},Sprite_BTB_TurnOrder_Battler[_0x2beff5(0x2fe)][_0x2beff5(0x3df)]=function(){const _0xabe4d6=_0x2beff5,_0x5cfaae=Window_BTB_TurnOrder[_0xabe4d6(0x3a4)];return this[_0xabe4d6(0x19f)]()?_0x5cfaae[_0xabe4d6(0x3a0)]:_0x5cfaae[_0xabe4d6(0x1e8)];},Sprite_BTB_TurnOrder_Battler[_0x2beff5(0x2fe)][_0x2beff5(0x31d)]=function(){const _0x5f48cd=_0x2beff5;this['bitmap']=new Bitmap(0x48,0x24);const _0x4821e7=this['battler']()?this[_0x5f48cd(0x1dd)]()['name']():_0x5f48cd(0x1fd)[_0x5f48cd(0x13d)](this[_0x5f48cd(0x2a1)],this['_index']);this[_0x5f48cd(0x2e5)][_0x5f48cd(0x335)](_0x4821e7,0x0,0x0,0x48,0x24,'center');},Sprite_BTB_TurnOrder_Battler[_0x2beff5(0x2fe)][_0x2beff5(0x203)]=function(){const _0x371a5c=_0x2beff5;if(!Window_BTB_TurnOrder[_0x371a5c(0x3a4)][_0x371a5c(0x11f)])return;const _0x21670d=Window_BTB_TurnOrder[_0x371a5c(0x3a4)],_0x27f393=this[_0x371a5c(0x2a1)]===$gameParty?_0x371a5c(0x172):_0x371a5c(0x1c9),_0x3ed216=_0x371a5c(0x395)[_0x371a5c(0x13d)](_0x27f393),_0x522149=new Sprite();_0x522149[_0x371a5c(0x303)]['x']=this['anchor']['x'],_0x522149[_0x371a5c(0x303)]['y']=this['anchor']['y'];if(_0x21670d[_0x3ed216]){if('JKDiV'!=='qfjHO')_0x522149[_0x371a5c(0x2e5)]=ImageManager[_0x371a5c(0x2ac)](_0x21670d[_0x3ed216]);else return _0x6163ad(_0x52200d['$1']);}else{const _0x139f10=this[_0x371a5c(0x38b)](),_0x483fe7=this['bitmapHeight']();_0x522149[_0x371a5c(0x2e5)]=new Bitmap(_0x139f10,_0x483fe7);const _0x512e32=ColorManager['getColor'](_0x21670d[_0x371a5c(0x1c1)[_0x371a5c(0x13d)](_0x27f393)]),_0x32bda4=ColorManager[_0x371a5c(0x2f2)](_0x21670d[_0x371a5c(0x20b)[_0x371a5c(0x13d)](_0x27f393)]);_0x522149['bitmap'][_0x371a5c(0x3b3)](0x0,0x0,_0x139f10,_0x483fe7,_0x512e32,_0x32bda4,!![]);}this[_0x371a5c(0x182)]=_0x522149,this[_0x371a5c(0x240)](this[_0x371a5c(0x182)]);},Sprite_BTB_TurnOrder_Battler[_0x2beff5(0x2fe)][_0x2beff5(0x393)]=function(){const _0x5d8e83=_0x2beff5,_0x5933c0=new Sprite();_0x5933c0['anchor']['x']=this[_0x5d8e83(0x303)]['x'],_0x5933c0['anchor']['y']=this[_0x5d8e83(0x303)]['y'],this[_0x5d8e83(0x156)]=_0x5933c0,this['addChild'](this[_0x5d8e83(0x156)]),this[_0x5d8e83(0x27f)]();},Sprite_BTB_TurnOrder_Battler[_0x2beff5(0x2fe)]['createBorderSprite']=function(){const _0x46c122=_0x2beff5;if(!Window_BTB_TurnOrder[_0x46c122(0x3a4)][_0x46c122(0x188)])return;const _0x49d3f2=Window_BTB_TurnOrder['Settings'],_0x31c13b=this[_0x46c122(0x2a1)]===$gameParty?_0x46c122(0x172):_0x46c122(0x1c9),_0x2fd802=_0x46c122(0x28f)[_0x46c122(0x13d)](_0x31c13b),_0x4a4fca=new Sprite();_0x4a4fca['anchor']['x']=this[_0x46c122(0x303)]['x'],_0x4a4fca['anchor']['y']=this[_0x46c122(0x303)]['y'];if(_0x49d3f2[_0x2fd802])_0x4a4fca[_0x46c122(0x2e5)]=ImageManager['loadSystem'](_0x49d3f2[_0x2fd802]);else{let _0x508103=this[_0x46c122(0x38b)](),_0x5a6e9e=this[_0x46c122(0x3df)](),_0x4195dd=_0x49d3f2[_0x46c122(0x322)];_0x4a4fca[_0x46c122(0x2e5)]=new Bitmap(_0x508103,_0x5a6e9e);const _0x457c59='#000000',_0x187d53=ColorManager[_0x46c122(0x2f2)](_0x49d3f2[_0x46c122(0x319)[_0x46c122(0x13d)](_0x31c13b)]);_0x4a4fca[_0x46c122(0x2e5)]['fillRect'](0x0,0x0,_0x508103,_0x5a6e9e,_0x457c59),_0x508103-=0x2,_0x5a6e9e-=0x2,_0x4a4fca[_0x46c122(0x2e5)]['fillRect'](0x1,0x1,_0x508103,_0x5a6e9e,_0x187d53),_0x508103-=_0x4195dd*0x2,_0x5a6e9e-=_0x4195dd*0x2,_0x4a4fca['bitmap']['fillRect'](0x1+_0x4195dd,0x1+_0x4195dd,_0x508103,_0x5a6e9e,_0x457c59),_0x508103-=0x2,_0x5a6e9e-=0x2,_0x4195dd+=0x1,_0x4a4fca[_0x46c122(0x2e5)][_0x46c122(0x2d6)](0x1+_0x4195dd,0x1+_0x4195dd,_0x508103,_0x5a6e9e);}this[_0x46c122(0x182)]=_0x4a4fca,this[_0x46c122(0x240)](this[_0x46c122(0x182)]),this['width']=this[_0x46c122(0x182)][_0x46c122(0x3cb)],this[_0x46c122(0x22d)]=this[_0x46c122(0x182)][_0x46c122(0x22d)];},Sprite_BTB_TurnOrder_Battler[_0x2beff5(0x2fe)][_0x2beff5(0x19b)]=function(){const _0x235ba5=_0x2beff5,_0x4c45f7=Window_BTB_TurnOrder[_0x235ba5(0x3a4)];if(!_0x4c45f7[_0x235ba5(0x288)])return;if(this['_unit']===$gameParty)return;const _0xf95278=this['bitmapWidth'](),_0x33ad3f=this[_0x235ba5(0x3df)](),_0x57124f=new Sprite();_0x57124f[_0x235ba5(0x303)]['x']=this[_0x235ba5(0x303)]['x'],_0x57124f[_0x235ba5(0x303)]['y']=this[_0x235ba5(0x303)]['y'],_0x57124f['bitmap']=new Bitmap(_0xf95278,_0x33ad3f),this[_0x235ba5(0x2cc)]=_0x57124f,this[_0x235ba5(0x240)](this[_0x235ba5(0x2cc)]);},Sprite_BTB_TurnOrder_Battler[_0x2beff5(0x2fe)][_0x2beff5(0x1dd)]=function(){const _0x3aeaf8=_0x2beff5;return this[_0x3aeaf8(0x2a1)]?this[_0x3aeaf8(0x2a1)][_0x3aeaf8(0x1ad)]()[this[_0x3aeaf8(0x2d0)]]:null;},Sprite_BTB_TurnOrder_Battler[_0x2beff5(0x2fe)][_0x2beff5(0x20f)]=function(){const _0x4d4b1f=_0x2beff5;Sprite_Clickable[_0x4d4b1f(0x2fe)]['update'][_0x4d4b1f(0x354)](this),this['checkPosition'](),this[_0x4d4b1f(0x276)](),this['checkOpacity'](),this[_0x4d4b1f(0x1b8)](),this[_0x4d4b1f(0x1ce)](),this['updateGraphicHue'](),this[_0x4d4b1f(0x1fa)](),this[_0x4d4b1f(0x16b)]();},Sprite_BTB_TurnOrder_Battler['prototype'][_0x2beff5(0x38d)]=function(){const _0x46645a=_0x2beff5,_0x50952f=this[_0x46645a(0x371)]();if(this['_position']===_0x50952f)return;this[_0x46645a(0x173)]=_0x50952f;if(this[_0x46645a(0x217)]<0xff&&this[_0x46645a(0x1dd)]()&&_0x50952f!==this[_0x46645a(0x2d8)]()){if(_0x46645a(0x254)!==_0x46645a(0x254))return this['_bravePoints']||0x0;else this['startFade'](0xff);}if(_0x50952f===this['defaultPosition']()&&this[_0x46645a(0x11a)]<=0x0&&this[_0x46645a(0x217)]>0x0)this[_0x46645a(0x152)](0x0);else{if(this['_fadeDuration']<=0x0&&this['opacity']<0xff){if(_0x46645a(0x317)===_0x46645a(0x317))this['checkOpacity']();else{const _0x6487d6=_0x46645a(0x389),_0xec9971=_0x177ec3['%1AnimationID'[_0x46645a(0x13d)](_0x6487d6)],_0x2793df=_0x1a9ed1[_0x46645a(0x136)[_0x46645a(0x13d)](_0x6487d6)],_0x4c2a16=_0x3b4406[_0x46645a(0x2b9)[_0x46645a(0x13d)](_0x6487d6)];_0x3bbc7c[_0x46645a(0x112)]([this],_0xec9971,_0x2793df,_0x4c2a16);}}}this[_0x46645a(0x1d6)]();},Sprite_BTB_TurnOrder_Battler[_0x2beff5(0x2fe)][_0x2beff5(0x318)]=function(){const _0x431cdb=_0x2beff5,_0x679c5f=this[_0x431cdb(0x278)]();if(!_0x679c5f)return;let _0x1ad544=![];if(this[_0x431cdb(0x270)]!==_0x679c5f[_0x431cdb(0x3cb)])_0x1ad544=!![];else this[_0x431cdb(0x2a0)]!==_0x679c5f[_0x431cdb(0x22d)]&&(_0x1ad544=!![]);if(_0x1ad544){if('aQwOb'!==_0x431cdb(0x18d))this['calculateTargetPositions']();else{const _0x47e7bc=_0x39e0cd[_0x431cdb(0x39a)]['JS'][_0x17bc57][_0x431cdb(0x354)](this,this[_0x431cdb(0x328)](),_0xe791d9,this[_0x431cdb(0x328)]()[_0x431cdb(0x253)]());this[_0x431cdb(0x328)]()[_0x431cdb(0x26c)](_0x47e7bc);}}},Sprite_BTB_TurnOrder_Battler['prototype'][_0x2beff5(0x1d6)]=function(){const _0x1b84e6=_0x2beff5,_0xc80f94=Window_BTB_TurnOrder[_0x1b84e6(0x3a4)],_0x5093ac=this[_0x1b84e6(0x19f)](),_0x10834a=_0xc80f94[_0x1b84e6(0x37b)],_0x5567=_0xc80f94['SubjectDistance'],_0x3ee80a=SceneManager['_scene'][_0x1b84e6(0x170)];if(!_0x3ee80a)return;const _0x371690=this[_0x1b84e6(0x371)]();this[_0x1b84e6(0x231)]=_0xc80f94[_0x1b84e6(0x124)],this[_0x1b84e6(0x1af)]=_0x5093ac?_0xc80f94[_0x1b84e6(0x1e8)]*_0x371690:0x0,this['_positionTargetY']=_0x5093ac?0x0:_0xc80f94[_0x1b84e6(0x1e8)]*_0x371690;_0x371690>0x0&&(this['_positionTargetX']+=_0x5093ac?_0x5567:0x0,this[_0x1b84e6(0x24c)]+=_0x5093ac?0x0:_0x5567);if(_0x10834a){if(_0x1b84e6(0x275)!==_0x1b84e6(0x1a2))this[_0x1b84e6(0x1af)]=_0x5093ac?_0x3ee80a[_0x1b84e6(0x3cb)]-this[_0x1b84e6(0x1af)]-_0xc80f94[_0x1b84e6(0x1e8)]:0x0;else{this[_0x1b84e6(0x2e5)]=new _0x5cd3ee(0x48,0x24);const _0x5df5cc=this['battler']()?this[_0x1b84e6(0x1dd)]()[_0x1b84e6(0x237)]():_0x1b84e6(0x1fd)[_0x1b84e6(0x13d)](this['_unit'],this[_0x1b84e6(0x2d0)]);this[_0x1b84e6(0x2e5)]['drawText'](_0x5df5cc,0x0,0x0,0x48,0x24,'center');}}else this[_0x1b84e6(0x24c)]=_0x5093ac?0x0:_0x3ee80a['height']-this[_0x1b84e6(0x24c)]-_0xc80f94[_0x1b84e6(0x1e8)];},Sprite_BTB_TurnOrder_Battler[_0x2beff5(0x2fe)]['updatePosition']=function(){const _0x134e0a=_0x2beff5;if(this['_fadeDuration']>0x0)return;if(this[_0x134e0a(0x231)]>0x0){if(_0x134e0a(0x397)==='jqmQV'){const _0x650dd4=this['_positionDuration'];this['x']=(this['x']*(_0x650dd4-0x1)+this[_0x134e0a(0x1af)])/_0x650dd4,this['y']=(this['y']*(_0x650dd4-0x1)+this[_0x134e0a(0x24c)])/_0x650dd4,this[_0x134e0a(0x231)]--;}else{const _0x318acb=_0x177fe4['Settings'];if(_0x318acb[_0x134e0a(0x214)]!==_0x134e0a(0x29d))return;if(!_0x318acb[_0x134e0a(0x320)])return;if(!this[_0x134e0a(0x14a)])return;const _0x1d2f2e=this['_btbTurnOrderWindow']['y']-_0x35ad55['round']((_0x3dc887[_0x134e0a(0x22d)]-_0x1fed66[_0x134e0a(0x1c6)])/0x2),_0x4f87b6=_0x1d2f2e+this['_btbTurnOrderWindow']['height'];this[_0x134e0a(0x14a)]['y']=_0x4f87b6+_0x318acb[_0x134e0a(0x10d)];}}if(this[_0x134e0a(0x231)]<=0x0){this['x']=this[_0x134e0a(0x1af)],this['y']=this['_positionTargetY'];if(this[_0x134e0a(0x217)]<0xff&&!this['_isBattleOver']&&this[_0x134e0a(0x11a)]<=0x0){const _0x3be3b6=this[_0x134e0a(0x1dd)]();_0x3be3b6&&(this['_fadeTarget']=_0x3be3b6['isAlive']()&&_0x3be3b6['isAppeared']()?0xff:0x0);}}},Sprite_BTB_TurnOrder_Battler[_0x2beff5(0x2fe)][_0x2beff5(0x2d8)]=function(){const _0x4896f6=_0x2beff5,_0x5d2b6e=Window_BTB_TurnOrder['Settings'],_0x19cf89=this[_0x4896f6(0x19f)]()?_0x5d2b6e[_0x4896f6(0x19a)]:_0x5d2b6e[_0x4896f6(0x1bd)];return _0x19cf89+0x1;},Sprite_BTB_TurnOrder_Battler[_0x2beff5(0x2fe)][_0x2beff5(0x278)]=function(){const _0x382c98=_0x2beff5;return SceneManager[_0x382c98(0x1f5)]['_btbTurnOrderWindow'];},Sprite_BTB_TurnOrder_Battler[_0x2beff5(0x2fe)]['containerPosition']=function(){const _0x24d0b3=_0x2beff5,_0x22c542=this['battler']();if(!_0x22c542)return this[_0x24d0b3(0x2d8)]();if(_0x22c542===BattleManager[_0x24d0b3(0x34d)])return 0x0;if(BattleManager['_actionBattlers'][_0x24d0b3(0x359)](_0x22c542)){if(_0x24d0b3(0x2e7)!=='DZTZy'){const _0x1048ea=BattleManager[_0x24d0b3(0x2e8)][_0x24d0b3(0x3c7)](_0x22c542)+0x1;return _0x1048ea;}else _0x30dc17+=_0xbcaa74(_0x23012c['$1']);}return this['defaultPosition']();},Sprite_BTB_TurnOrder_Battler[_0x2beff5(0x2fe)][_0x2beff5(0x152)]=function(_0x2871f4){const _0x4c4edc=_0x2beff5,_0x858075=Window_BTB_TurnOrder[_0x4c4edc(0x3a4)];this['_fadeDuration']=_0x858075[_0x4c4edc(0x124)],this[_0x4c4edc(0x26f)]=_0x2871f4;},Sprite_BTB_TurnOrder_Battler[_0x2beff5(0x2fe)][_0x2beff5(0x1bc)]=function(){const _0x4fde00=_0x2beff5,_0x26adea=this['battler']();if(!_0x26adea)return;if(this[_0x4fde00(0x19c)]===_0x26adea[_0x4fde00(0x1a5)]()&&this[_0x4fde00(0x1e7)]===_0x26adea[_0x4fde00(0x211)]())return;this[_0x4fde00(0x19c)]=_0x26adea[_0x4fde00(0x1a5)](),this[_0x4fde00(0x1e7)]=_0x26adea[_0x4fde00(0x211)]();let _0x35b4f1=this[_0x4fde00(0x19c)]&&this[_0x4fde00(0x1e7)]?0xff:0x0;this[_0x4fde00(0x152)](_0x35b4f1);},Sprite_BTB_TurnOrder_Battler[_0x2beff5(0x2fe)][_0x2beff5(0x1b8)]=function(){const _0x4c6b55=_0x2beff5;if(this['_fadeDuration']>0x0){const _0x3ad9ad=this['_fadeDuration'];this[_0x4c6b55(0x217)]=(this[_0x4c6b55(0x217)]*(_0x3ad9ad-0x1)+this[_0x4c6b55(0x26f)])/_0x3ad9ad,this['_fadeDuration']--,this['_fadeDuration']<=0x0&&(this[_0x4c6b55(0x38d)](),this['_positionDuration']=0x0,this[_0x4c6b55(0x276)](),this[_0x4c6b55(0x217)]=this[_0x4c6b55(0x26f)]);}if(this[_0x4c6b55(0x162)])return;BattleManager['_phase']===_0x4c6b55(0x2be)&&(this[_0x4c6b55(0x162)]=!![],this[_0x4c6b55(0x152)](0x0));},Sprite_BTB_TurnOrder_Battler[_0x2beff5(0x2fe)]['updateGraphic']=function(){const _0x113ab7=_0x2beff5,_0x23086d=this['battler']();if(!_0x23086d)return;const _0xcfdd12=Window_BTB_TurnOrder[_0x113ab7(0x3a4)],_0x103f8c=this['_unit']===$gameParty?_0x113ab7(0x172):'Enemy';let _0x4d8f20=_0x23086d['TurnOrderBTBGraphicType']();if(_0x23086d['isActor']()&&_0x4d8f20===_0x113ab7(0x3a6))_0x4d8f20='face';else _0x23086d[_0x113ab7(0x244)]()&&_0x4d8f20==='svactor'&&(_0x4d8f20=_0x113ab7(0x3a6));if(this[_0x113ab7(0x14e)]!==_0x4d8f20)return this[_0x113ab7(0x27f)]();switch(this[_0x113ab7(0x14e)]){case'face':if(this[_0x113ab7(0x27a)]!==_0x23086d[_0x113ab7(0x3b8)]()){if(_0x113ab7(0x367)==='dJpFn'){const _0x3aa52a=this['bitmapWidth'](),_0xdf22ac=this[_0x113ab7(0x3df)]();_0x4cdb66[_0x113ab7(0x2e5)]=new _0x12fb07(_0x3aa52a,_0xdf22ac);const _0x44599b=_0x58c163[_0x113ab7(0x2f2)](_0x397861['%1BgColor1'[_0x113ab7(0x13d)](_0x29a8d2)]),_0x2217fa=_0x3e0e29['getColor'](_0x352cd3[_0x113ab7(0x20b)['format'](_0x5867f3)]);_0x3126fd[_0x113ab7(0x2e5)]['gradientFillRect'](0x0,0x0,_0x3aa52a,_0xdf22ac,_0x44599b,_0x2217fa,!![]);}else return this[_0x113ab7(0x27f)]();}if(this['_graphicFaceIndex']!==_0x23086d[_0x113ab7(0x1eb)]()){if(_0x113ab7(0x3ab)!==_0x113ab7(0x299))return this[_0x113ab7(0x27f)]();else{if(!_0x2002af[_0x113ab7(0x157)]())return;if(!this['_actor'])return;this[_0x113ab7(0x140)]();if(this[_0x113ab7(0x163)]['hideBraveTrait']())return;this[_0x113ab7(0x3db)]=new _0xa6aaa3(),this[_0x113ab7(0x240)](this[_0x113ab7(0x3db)]),this['modifyBTBActionCounterSprite']();}}break;case _0x113ab7(0x34e):if(this[_0x113ab7(0x16a)]!==_0x23086d[_0x113ab7(0x176)]())return this['processUpdateGraphic']();break;case _0x113ab7(0x3a6):if(_0x23086d[_0x113ab7(0x161)]()){if(this['_graphicSv']!==_0x23086d[_0x113ab7(0x39c)]())return this['processUpdateGraphic']();}else{if(this[_0x113ab7(0x185)]!==_0x23086d[_0x113ab7(0x32d)]()){if('GFxdp'===_0x113ab7(0x37e))_0x1b5901+=_0x288420;else return this[_0x113ab7(0x27f)]();}}break;case'svactor':if(_0x23086d['isActor']()){if(_0x113ab7(0x18b)===_0x113ab7(0x18b)){if(this[_0x113ab7(0x1d0)]!==_0x23086d['battlerName']()){if(_0x113ab7(0x3ce)!==_0x113ab7(0x3ce))this[_0x113ab7(0x2b6)](_0x541d54,_0x37d638,_0x3e8f3c);else return this[_0x113ab7(0x27f)]();}}else{this[_0x113ab7(0x2bc)](_0x6724a8);return;}}else{if(this[_0x113ab7(0x185)]!==_0x23086d[_0x113ab7(0x32d)]())return this[_0x113ab7(0x27f)]();}break;}},Sprite_BTB_TurnOrder_Battler[_0x2beff5(0x2fe)][_0x2beff5(0x27f)]=function(){const _0x201102=_0x2beff5,_0x4ee2ad=this[_0x201102(0x1dd)]();if(!_0x4ee2ad)return;this[_0x201102(0x14e)]=_0x4ee2ad[_0x201102(0x399)]();if(_0x4ee2ad[_0x201102(0x336)]()&&this[_0x201102(0x14e)]===_0x201102(0x3a6)){if(_0x201102(0x1ea)===_0x201102(0x1ea))this[_0x201102(0x14e)]='face';else return _0x3a6728['isBTB']();}else _0x4ee2ad['isEnemy']()&&this[_0x201102(0x14e)]===_0x201102(0x243)&&(this[_0x201102(0x14e)]=_0x201102(0x3a6));let _0x5cda87;switch(this[_0x201102(0x14e)]){case _0x201102(0x234):this['_graphicFaceName']=_0x4ee2ad[_0x201102(0x3b8)](),this[_0x201102(0x1ed)]=_0x4ee2ad[_0x201102(0x1eb)](),_0x5cda87=ImageManager[_0x201102(0x2b3)](this[_0x201102(0x27a)]),_0x5cda87[_0x201102(0x1a8)](this['changeFaceGraphicBitmap']['bind'](this,_0x5cda87));break;case _0x201102(0x34e):this[_0x201102(0x16a)]=_0x4ee2ad[_0x201102(0x35d)](),_0x5cda87=ImageManager[_0x201102(0x2ac)](_0x201102(0x128)),_0x5cda87[_0x201102(0x1a8)](this['changeIconGraphicBitmap']['bind'](this,_0x5cda87));break;case _0x201102(0x3a6):if(_0x4ee2ad[_0x201102(0x161)]())this[_0x201102(0x1d0)]=_0x4ee2ad[_0x201102(0x39c)](),_0x5cda87=ImageManager[_0x201102(0x25f)](this[_0x201102(0x1d0)]),_0x5cda87['addLoadListener'](this[_0x201102(0x223)]['bind'](this,_0x5cda87));else{if($gameSystem['isSideView']()){if('nIRGB'!==_0x201102(0x39e))this[_0x201102(0x185)]=_0x4ee2ad[_0x201102(0x32d)](),_0x5cda87=ImageManager[_0x201102(0x3a3)](this[_0x201102(0x185)]),_0x5cda87[_0x201102(0x1a8)](this['changeEnemyGraphicBitmap'][_0x201102(0x272)](this,_0x5cda87));else return _0x18cb7f['y']-_0x3cd1e4['y'];}else{if(_0x201102(0x110)===_0x201102(0x110))this[_0x201102(0x185)]=_0x4ee2ad[_0x201102(0x32d)](),_0x5cda87=ImageManager['loadEnemy'](this[_0x201102(0x185)]),_0x5cda87[_0x201102(0x1a8)](this['changeEnemyGraphicBitmap'][_0x201102(0x272)](this,_0x5cda87));else{if(!_0x10e228['isBTB']())return;const _0x55f953=this['_actorCommandWindow'];if(!_0x55f953)return;_0x55f953['setHandler']('brave',this[_0x201102(0x384)]['bind'](this)),_0x55f953[_0x201102(0x1fe)](_0x201102(0x2cb),this[_0x201102(0x32e)]['bind'](this));}}}break;case _0x201102(0x243):this[_0x201102(0x1d0)]=_0x4ee2ad[_0x201102(0x32d)](),_0x5cda87=ImageManager['loadSvActor'](this['_graphicSv']),_0x5cda87[_0x201102(0x1a8)](this['changeSvActorGraphicBitmap'][_0x201102(0x272)](this,_0x5cda87));break;}},Sprite_BTB_TurnOrder_Battler['prototype']['changeFaceGraphicBitmap']=function(_0x4f35cf){const _0x3d820f=_0x2beff5,_0x268374=this[_0x3d820f(0x1ed)],_0x58e846=this[_0x3d820f(0x38b)](),_0x29257e=this['bitmapHeight'](),_0x51992c=Math[_0x3d820f(0x142)](_0x58e846,_0x29257e);this[_0x3d820f(0x156)][_0x3d820f(0x2e5)]=new Bitmap(_0x58e846,_0x29257e);const _0x5a0756=this[_0x3d820f(0x156)]['bitmap'],_0x3835f7=ImageManager[_0x3d820f(0x1fb)],_0x3612fc=ImageManager['faceHeight'],_0x24aca6=_0x51992c/Math[_0x3d820f(0x142)](_0x3835f7,_0x3612fc),_0x5224b2=ImageManager[_0x3d820f(0x1fb)],_0x4a0ff0=ImageManager['faceHeight'],_0x2e794f=_0x268374%0x4*_0x3835f7+(_0x3835f7-_0x5224b2)/0x2,_0x37fe53=Math[_0x3d820f(0x1c7)](_0x268374/0x4)*_0x3612fc+(_0x3612fc-_0x4a0ff0)/0x2,_0x57d514=(_0x58e846-_0x3835f7*_0x24aca6)/0x2,_0x593ca8=(_0x29257e-_0x3612fc*_0x24aca6)/0x2;_0x5a0756[_0x3d820f(0x178)](_0x4f35cf,_0x2e794f,_0x37fe53,_0x5224b2,_0x4a0ff0,_0x57d514,_0x593ca8,_0x51992c,_0x51992c);},Sprite_BTB_TurnOrder_Battler[_0x2beff5(0x2fe)]['changeIconGraphicBitmap']=function(_0x3c79cc){const _0x32ffe8=_0x2beff5,_0x1bdf6f=this[_0x32ffe8(0x16a)],_0x244b3e=this[_0x32ffe8(0x38b)](),_0x38435a=this['bitmapHeight']();this[_0x32ffe8(0x156)][_0x32ffe8(0x2e5)]=new Bitmap(_0x244b3e,_0x38435a);const _0x6cda0b=this[_0x32ffe8(0x156)]['bitmap'],_0x920ed8=ImageManager['iconWidth'],_0x13e52a=ImageManager[_0x32ffe8(0x364)],_0x178245=Math[_0x32ffe8(0x25d)](_0x920ed8,_0x13e52a,_0x244b3e,_0x38435a),_0x329a44=_0x1bdf6f%0x10*_0x920ed8,_0x4c223b=Math['floor'](_0x1bdf6f/0x10)*_0x13e52a,_0x41f53b=Math[_0x32ffe8(0x1c7)](Math[_0x32ffe8(0x142)](_0x244b3e-_0x178245,0x0)/0x2),_0x254566=Math[_0x32ffe8(0x1c7)](Math[_0x32ffe8(0x142)](_0x38435a-_0x178245,0x0)/0x2);_0x6cda0b[_0x32ffe8(0x178)](_0x3c79cc,_0x329a44,_0x4c223b,_0x920ed8,_0x13e52a,_0x41f53b,_0x254566,_0x178245,_0x178245);},Sprite_BTB_TurnOrder_Battler['prototype'][_0x2beff5(0x223)]=function(_0x1278fb){const _0x503575=_0x2beff5,_0x172468=this[_0x503575(0x38b)](),_0x4e711c=this[_0x503575(0x3df)](),_0x446c65=Math['min'](_0x172468,_0x4e711c);this['_graphicSprite']['bitmap']=new Bitmap(_0x172468,_0x4e711c);const _0x13714c=this['_graphicSprite'][_0x503575(0x2e5)],_0x1a150f=this[_0x503575(0x1d0)][_0x503575(0x28e)](/\$/i),_0x244797=_0x1a150f?0x1:ImageManager[_0x503575(0x201)],_0x3642be=_0x1a150f?0x1:ImageManager['svActorVertCells'],_0x4cdb5b=_0x1278fb[_0x503575(0x3cb)]/_0x244797,_0x3db4ca=_0x1278fb[_0x503575(0x22d)]/_0x3642be,_0x281dbe=Math[_0x503575(0x25d)](0x1,_0x446c65/_0x4cdb5b,_0x446c65/_0x3db4ca),_0x294928=_0x4cdb5b*_0x281dbe,_0x31e811=_0x3db4ca*_0x281dbe,_0x1034b6=Math[_0x503575(0x3ad)]((_0x172468-_0x294928)/0x2),_0x2df862=Math[_0x503575(0x3ad)]((_0x4e711c-_0x31e811)/0x2);_0x13714c[_0x503575(0x178)](_0x1278fb,0x0,0x0,_0x4cdb5b,_0x3db4ca,_0x1034b6,_0x2df862,_0x294928,_0x31e811);},Sprite_BTB_TurnOrder_Battler[_0x2beff5(0x2fe)]['changeEnemyGraphicBitmap']=function(_0x2173b8){const _0x277586=_0x2beff5,_0x558971=Window_BTB_TurnOrder[_0x277586(0x3a4)],_0x59011e=this['bitmapWidth'](),_0xfda35e=this[_0x277586(0x3df)](),_0x23426e=Math['min'](_0x59011e,_0xfda35e);this[_0x277586(0x156)][_0x277586(0x2e5)]=new Bitmap(_0x59011e,_0xfda35e);const _0x377c18=this[_0x277586(0x156)][_0x277586(0x2e5)],_0x9de540=Math[_0x277586(0x25d)](0x1,_0x23426e/_0x2173b8[_0x277586(0x3cb)],_0x23426e/_0x2173b8[_0x277586(0x22d)]),_0x2bbc67=_0x2173b8[_0x277586(0x3cb)]*_0x9de540,_0x5c6928=_0x2173b8['height']*_0x9de540,_0x58b67c=Math[_0x277586(0x3ad)]((_0x59011e-_0x2bbc67)/0x2),_0x15da87=Math[_0x277586(0x3ad)]((_0xfda35e-_0x5c6928)/0x2);_0x377c18[_0x277586(0x178)](_0x2173b8,0x0,0x0,_0x2173b8[_0x277586(0x3cb)],_0x2173b8[_0x277586(0x22d)],_0x58b67c,_0x15da87,_0x2bbc67,_0x5c6928);},Sprite_BTB_TurnOrder_Battler['prototype']['updateGraphicHue']=function(){const _0x4428c8=_0x2beff5,_0x527d45=this[_0x4428c8(0x1dd)]();if(!_0x527d45)return;if(!_0x527d45['isEnemy']())return;if(this[_0x4428c8(0x15f)]===_0x527d45['battlerHue']())return;this[_0x4428c8(0x15f)]=_0x527d45[_0x4428c8(0x2d2)]();if(_0x527d45['hasSvBattler']())this[_0x4428c8(0x15f)]=0x0;this['_graphicSprite'][_0x4428c8(0x227)](this['_graphicHue']);},Sprite_BTB_TurnOrder_Battler[_0x2beff5(0x2fe)][_0x2beff5(0x1fa)]=function(){const _0x2cbd8f=_0x2beff5;if(!this[_0x2cbd8f(0x2cc)])return;const _0x5727c7=this['battler']();if(!_0x5727c7)return;if(this[_0x2cbd8f(0x1a0)]===_0x5727c7['_letter']&&this['_plural']===_0x5727c7[_0x2cbd8f(0x267)])return;this['_letter']=_0x5727c7[_0x2cbd8f(0x1a0)],this[_0x2cbd8f(0x267)]=_0x5727c7[_0x2cbd8f(0x267)];const _0x4a5326=Window_BTB_TurnOrder[_0x2cbd8f(0x3a4)],_0x32143b=this['isHorz'](),_0x5e019f=this[_0x2cbd8f(0x38b)](),_0x55b8b3=this['bitmapHeight'](),_0x3dda53=this[_0x2cbd8f(0x2cc)]['bitmap'];_0x3dda53[_0x2cbd8f(0x3d9)]();if(!this[_0x2cbd8f(0x267)])return;_0x3dda53[_0x2cbd8f(0x2b8)]=_0x4a5326[_0x2cbd8f(0x2c4)]||$gameSystem[_0x2cbd8f(0x385)](),_0x3dda53[_0x2cbd8f(0x30a)]=_0x4a5326[_0x2cbd8f(0x1f2)]||0x10,_0x32143b?_0x3dda53[_0x2cbd8f(0x335)](this[_0x2cbd8f(0x1a0)][_0x2cbd8f(0x1a1)](),0x0,_0x55b8b3/0x2,_0x5e019f,_0x55b8b3/0x2,'center'):_0x3dda53[_0x2cbd8f(0x335)](this[_0x2cbd8f(0x1a0)]['trim'](),0x0,0x2,_0x5e019f-0x8,_0x55b8b3-0x4,_0x2cbd8f(0x139));},Sprite_BTB_TurnOrder_Battler[_0x2beff5(0x2fe)]['updateSelectionEffect']=function(){const _0x1ec9ce=_0x2beff5,_0xc3ccef=this[_0x1ec9ce(0x1dd)]();if(!_0xc3ccef)return;const _0x591692=_0xc3ccef['battler']();if(!_0x591692)return;const _0x1079c6=_0x591692[_0x1ec9ce(0x2fa)]();if(!_0x1079c6)return;this[_0x1ec9ce(0x245)](_0x1079c6[_0x1ec9ce(0x2bf)]);},Sprite_BTB_TurnOrder_Battler[_0x2beff5(0x2fe)]['getStateTooltipBattler']=function(){return this['battler']();},VisuMZ[_0x2beff5(0x39a)][_0x2beff5(0x2f5)]=Window_Base[_0x2beff5(0x2fe)][_0x2beff5(0x390)],Window_Base[_0x2beff5(0x2fe)][_0x2beff5(0x390)]=function(_0x3b4515,_0x437787,_0x342a59){const _0x5261a3=_0x2beff5;return _0x342a59=VisuMZ[_0x5261a3(0x39a)][_0x5261a3(0x2f5)][_0x5261a3(0x354)](this,_0x3b4515,_0x437787,_0x342a59),_0x342a59=this[_0x5261a3(0x153)](_0x3b4515,_0x437787,_0x342a59),_0x342a59;},VisuMZ[_0x2beff5(0x39a)][_0x2beff5(0x1dc)]=Window_Base['prototype'][_0x2beff5(0x2fc)],Window_Base[_0x2beff5(0x2fe)][_0x2beff5(0x2fc)]=function(_0x373c9e,_0x433e14,_0x36ff43,_0x203b02){const _0x4dceab=_0x2beff5;BattleManager[_0x4dceab(0x157)]()&&this[_0x4dceab(0x398)]===Window_BattleItem?this['drawItemNumberBTB'](_0x373c9e,_0x433e14,_0x36ff43,_0x203b02):VisuMZ[_0x4dceab(0x39a)][_0x4dceab(0x1dc)][_0x4dceab(0x354)](this,_0x373c9e,_0x433e14,_0x36ff43,_0x203b02),this[_0x4dceab(0x12d)]();},Window_Base[_0x2beff5(0x2fe)]['drawItemNumberBTB']=function(_0x435c6c,_0x4c2c74,_0xdd5557,_0x27b4d7){const _0x11988b=_0x2beff5,_0x200a5e=VisuMZ['BattleSystemBTB'][_0x11988b(0x3a4)][_0x11988b(0x10e)],_0x517de9=BattleManager[_0x11988b(0x163)]||$gameParty[_0x11988b(0x1ad)]()[0x0],_0x2462a4=this[_0x11988b(0x153)](_0x517de9,_0x435c6c,''),_0x3b66a2=this['textSizeEx'](_0x2462a4)[_0x11988b(0x3cb)],_0x483b16=_0x200a5e[_0x11988b(0x138)];let _0x157605=_0x4c2c74+_0x27b4d7-_0x3b66a2;if(_0x2462a4==='')VisuMZ['BattleSystemBTB']['Window_Base_drawItemNumber'][_0x11988b(0x354)](this,_0x435c6c,_0x4c2c74,_0xdd5557,_0x27b4d7);else{if(this[_0x11988b(0x360)](_0x435c6c)){if(_0x11988b(0x13a)!==_0x11988b(0x387)){this['resetFontSettings']();const _0x40907e=VisuMZ[_0x11988b(0x1f6)]['Settings'][_0x11988b(0x3b4)];this['contents'][_0x11988b(0x30a)]=_0x40907e[_0x11988b(0x2aa)];if(_0x483b16){const _0x2152ee=_0x40907e[_0x11988b(0x187)],_0x1f41a9=_0x2152ee[_0x11988b(0x13d)]($gameParty[_0x11988b(0x30e)](_0x435c6c)),_0x2e6654=this[_0x11988b(0x35c)](_0x1f41a9+this[_0x11988b(0x27d)]());_0x157605-=_0x2e6654;}else{if(_0x11988b(0x260)!==_0x11988b(0x260))return this[_0x11988b(0x3c5)]()[_0x11988b(0x11d)]()[_0x11988b(0x2f9)]>0x0;else _0x27b4d7-=this[_0x11988b(0x35c)](this['skillCostSeparator']())+_0x3b66a2;}VisuMZ[_0x11988b(0x39a)][_0x11988b(0x1dc)][_0x11988b(0x354)](this,_0x435c6c,_0x4c2c74,_0xdd5557,_0x27b4d7);}else{if(!this['_btbActionSprite'])return;this[_0x11988b(0x3db)]['bitmap']&&this['_btbActionSprite'][_0x11988b(0x2e5)][_0x11988b(0x386)](),this[_0x11988b(0x257)](this[_0x11988b(0x3db)]),delete this[_0x11988b(0x3db)];}}}this[_0x11988b(0x36d)](_0x2462a4,_0x157605,_0xdd5557);},Window_Base[_0x2beff5(0x2fe)][_0x2beff5(0x153)]=function(_0xee9d15,_0xc1124,_0x495d21){const _0x4b832c=_0x2beff5;if(!BattleManager[_0x4b832c(0x157)]())return _0x495d21;if(!_0xee9d15)return _0x495d21;if(!_0xc1124)return _0x495d21;if(_0xc1124['note']['match'](VisuMZ[_0x4b832c(0x39a)]['RegExp'][_0x4b832c(0x297)]))return _0x495d21;let _0x1fcc52=_0xee9d15[_0x4b832c(0x134)](_0xc1124);const _0x4d42cf=VisuMZ[_0x4b832c(0x39a)][_0x4b832c(0x3a4)][_0x4b832c(0x10e)],_0x538ea9=_0x4d42cf[_0x4b832c(0x138)],_0xc11f8a=_0x4d42cf[_0x4b832c(0x11c)],_0x589fed=_0x4d42cf[_0x4b832c(0x1b4)],_0x1af56e=_0x4d42cf['ReduceShownBPCost']||0x0,_0xeb7244=_0x4d42cf['Show_0_BP_Cost'],_0x22d0c0=_0x4d42cf[_0x4b832c(0x3dd)];if(DataManager[_0x4b832c(0x21d)](_0xc1124)&&this['constructor']===Window_ActorCommand){if(!_0xc11f8a&&_0xc1124['id']===_0xee9d15[_0x4b832c(0x2c8)]())return _0x495d21;if(!_0x589fed&&_0xc1124['id']===_0xee9d15[_0x4b832c(0x167)]())return _0x495d21;}_0x1fcc52-=_0x1af56e;if(_0x1fcc52<0x0)return _0x495d21;if(!_0xeb7244&&_0x1fcc52===0x0)return _0x495d21;if(!_0x22d0c0&&_0x1fcc52===0x1)return _0x495d21;const _0x2b7f58=_0x4b832c(0x202)['format'](ImageManager['btbBravePointsIcon']),_0x2a279c=TextManager[_0x4b832c(0x33d)];let _0x11f703=TextManager[_0x4b832c(0x370)][_0x4b832c(0x13d)](_0x1fcc52,_0x2a279c,_0x2b7f58);if(_0x495d21==='')_0x4b832c(0x1ca)===_0x4b832c(0x1ca)?_0x495d21+=_0x11f703:this['_btbTurnOrderVisible']=!![];else{if(_0x538ea9)_0x495d21=_0x11f703+this[_0x4b832c(0x27d)]()+_0x495d21;else{if('KLSxC'===_0x4b832c(0x2a8))_0x495d21=_0x495d21+this[_0x4b832c(0x27d)]()+_0x11f703;else{_0x18f2c9[_0x4b832c(0x39a)][_0x4b832c(0x3a1)][_0x4b832c(0x354)](this,_0x5dbde3);const _0x450a43=this[_0x4b832c(0x394)](_0x17985b);if(this[_0x4b832c(0x242)](_0x450a43)){const _0x5a1fe1=this['itemLineRect'](_0x585060),_0x1e7713=_0x4828d5[_0x4b832c(0x34b)]?0x4:0x3,_0x52a436=_0x1e7713*0x80+(_0x1e7713-0x1)*0x8+0x4;let _0x1bb32a=_0x5a1fe1['x']+this[_0x4b832c(0x356)];_0x2954de[_0x4b832c(0x34f)][_0x4b832c(0x3a4)]['BattleLayout'][_0x4b832c(0x11b)]?_0x1bb32a=_0x5a1fe1['x']+_0x26f923['faceWidth']+0x8:_0x1bb32a+=_0x7424d7[_0x4b832c(0x12b)];const _0x4fa755=_0x564006[_0x4b832c(0x3ad)](_0xe9ccb3[_0x4b832c(0x25d)](_0x5a1fe1['x']+_0x5a1fe1['width']-_0x52a436,_0x1bb32a));let _0x24b14e=_0x4fa755+0x88,_0x200d68=_0x5a1fe1['y'];_0x24b14e+=0x88*(_0x57e458['optDisplayTp']?0x3:0x2),_0x24b14e+=this[_0x4b832c(0x29b)](),_0x200d68+=this[_0x4b832c(0x25b)]();const _0x265c98=this['getAlignmentBTB']();if(_0x24b14e>_0x5a1fe1['x']+_0x5a1fe1[_0x4b832c(0x3cb)])return;this['drawActorBravePoints'](_0x450a43,_0x24b14e,_0x200d68,_0x5a1fe1[_0x4b832c(0x3cb)],_0x265c98);}}}}return _0x495d21;},Window_Selectable[_0x2beff5(0x2fe)][_0x2beff5(0x1e2)]=function(){return![];},VisuMZ[_0x2beff5(0x39a)][_0x2beff5(0x177)]=Window_Selectable['prototype'][_0x2beff5(0x2cd)],Window_Selectable[_0x2beff5(0x2fe)][_0x2beff5(0x2cd)]=function(_0x46028b){const _0x37d8da=_0x2beff5;VisuMZ[_0x37d8da(0x39a)][_0x37d8da(0x177)][_0x37d8da(0x354)](this,_0x46028b),this['isBattleItemWindowBTB']()&&this[_0x37d8da(0x20e)]&&this[_0x37d8da(0x125)]();},Window_Selectable[_0x2beff5(0x2fe)]['applyBattleItemWindowBTB']=function(){const _0x36fe8a=_0x2beff5;BattleManager[_0x36fe8a(0x27e)]();},VisuMZ[_0x2beff5(0x39a)][_0x2beff5(0x3d7)]=Window_Help[_0x2beff5(0x2fe)]['setItem'],Window_Help[_0x2beff5(0x2fe)][_0x2beff5(0x198)]=function(_0xcb63f0){const _0x3d5f01=_0x2beff5;if(BattleManager['isBTB']()&&_0xcb63f0&&_0xcb63f0['note']&&_0xcb63f0['note']['match'](VisuMZ[_0x3d5f01(0x39a)][_0x3d5f01(0x145)]['BTB_Help'])){if(_0x3d5f01(0x210)!==_0x3d5f01(0x210)){if(this[_0x3d5f01(0x157)]())return _0x3d5f01(0x228);return _0x46e08e['BattleSystemBTB'][_0x3d5f01(0x29c)][_0x3d5f01(0x354)](this);}else this['setText'](String(RegExp['$1']));}else _0x3d5f01(0x2e6)!==_0x3d5f01(0x18a)?VisuMZ[_0x3d5f01(0x39a)][_0x3d5f01(0x3d7)][_0x3d5f01(0x354)](this,_0xcb63f0):(this['x']=this[_0x3d5f01(0x346)]+(_0x308fa0[_0x3d5f01(0x3b2)]||0x0),this['y']=this[_0x3d5f01(0x2f8)]+(_0x276ba1[_0x3d5f01(0x20a)]||0x0));},VisuMZ[_0x2beff5(0x39a)][_0x2beff5(0x23e)]=Window_BattleLog[_0x2beff5(0x2fe)][_0x2beff5(0x33b)],Window_BattleLog[_0x2beff5(0x2fe)][_0x2beff5(0x33b)]=function(_0x40da12,_0x347d0b,_0x27b0bb){const _0x4430d4=_0x2beff5;if(this[_0x4430d4(0x174)](_0x40da12)){if(_0x4430d4(0x2fb)!=='Eykmm')this['queueBraveAnimationsBTB'](_0x40da12,_0x347d0b,_0x27b0bb);else{const _0x4fda24=this[_0x4430d4(0x1dd)]();if(!_0x4fda24)return;if(!_0x4fda24[_0x4430d4(0x244)]())return;if(this[_0x4430d4(0x15f)]===_0x4fda24[_0x4430d4(0x2d2)]())return;this['_graphicHue']=_0x4fda24[_0x4430d4(0x2d2)]();if(_0x4fda24[_0x4430d4(0x161)]())this['_graphicHue']=0x0;this['_graphicSprite'][_0x4430d4(0x227)](this[_0x4430d4(0x15f)]);}}else{if(_0x4430d4(0x200)===_0x4430d4(0x158)){const _0x5368bd=_0x5e4e67(_0x392d73['$1']);_0x5c87f7[_0x4430d4(0x180)](_0x5368bd);}else VisuMZ[_0x4430d4(0x39a)][_0x4430d4(0x23e)][_0x4430d4(0x354)](this,_0x40da12,_0x347d0b,_0x27b0bb);}},Window_BattleLog['prototype'][_0x2beff5(0x365)]=function(_0x29d6ff,_0x5a0d8d,_0x5734e2){const _0x2009f8=_0x2beff5;VisuMZ['BattleSystemBTB'][_0x2009f8(0x23e)][_0x2009f8(0x354)](this,_0x29d6ff,_0x5a0d8d,_0x5734e2);},Window_BattleLog['prototype']['showBraveAnimationBTB']=function(_0x5e13c8){const _0x2dbc90=_0x2beff5;if(!BattleManager['isBTB']())return![];if(!_0x5e13c8)return![];if(!_0x5e13c8[_0x2dbc90(0x244)]())return![];if(_0x5e13c8[_0x2dbc90(0x305)])return![];const _0x4153dd=VisuMZ[_0x2dbc90(0x39a)]['Settings'][_0x2dbc90(0x166)];if(!_0x4153dd[_0x2dbc90(0x239)])return![];if(_0x4153dd['BraveAnimationID']<=0x0)return![];return VisuMZ['BattleSystemBTB'][_0x2dbc90(0x3a4)][_0x2dbc90(0x166)]['ShowEnemyBrave'];},Window_BattleLog[_0x2beff5(0x2fe)][_0x2beff5(0x2b6)]=function(_0xbc59b2,_0x148eaa,_0x5f5b95){const _0x1a5625=_0x2beff5;_0xbc59b2['_braveStartupAnimation']=!![];let _0x380bf0=_0xbc59b2['braveAnimationTimes']();const _0x13103f=VisuMZ['BattleSystemBTB'][_0x1a5625(0x3a4)][_0x1a5625(0x166)],_0x27609b=_0x13103f[_0x1a5625(0x290)],_0x388e39=_0x13103f[_0x1a5625(0x23d)];while(_0x380bf0--){this[_0x1a5625(0x301)](_0x1a5625(0x1aa),[_0xbc59b2],_0x27609b);if(_0x380bf0>0x0){if(_0x1a5625(0x131)!==_0x1a5625(0x131)){if(!this[_0x1a5625(0x157)]())return;if(!_0x46d4f1[_0x1a5625(0x249)]())return;const _0x2ddc13=this['_actionBattlers'];for(const _0x7c506f of _0x2ddc13){_0x7c506f[_0x1a5625(0x133)]();}_0x2ddc13['sort']((_0x3148d6,_0x4c8582)=>_0x4c8582['speed']()-_0x3148d6[_0x1a5625(0x18f)]()),this[_0x1a5625(0x157)]()&&this[_0x1a5625(0x207)]();}else this[_0x1a5625(0x301)](_0x1a5625(0x160),_0x388e39);}else this[_0x1a5625(0x301)]('waitForAnimation');}this[_0x1a5625(0x301)]('startActionBTB',_0xbc59b2,_0x148eaa,_0x5f5b95);},VisuMZ['BattleSystemBTB'][_0x2beff5(0x2f0)]=Window_ActorCommand['prototype'][_0x2beff5(0x37f)],Window_ActorCommand[_0x2beff5(0x2fe)][_0x2beff5(0x37f)]=function(){const _0x52138c=_0x2beff5;this[_0x52138c(0x199)](),VisuMZ['BattleSystemBTB'][_0x52138c(0x2f0)][_0x52138c(0x354)](this);},Window_ActorCommand[_0x2beff5(0x2fe)][_0x2beff5(0x199)]=function(){const _0x33bfdc=_0x2beff5;if(!this[_0x33bfdc(0x376)]())return;const _0x5fe675=this[_0x33bfdc(0x326)](),_0x490606=TextManager['btbBraveCommand'],_0xfc21fe=ImageManager['btbBravePointsIcon'],_0x5d8a3a=_0x5fe675===_0x33bfdc(0x2d9)?_0x490606:_0x33bfdc(0x3b9)[_0x33bfdc(0x13d)](_0xfc21fe,_0x490606);this[_0x33bfdc(0x1db)](_0x5d8a3a,'brave',this['_actor'][_0x33bfdc(0x1df)]()),BattleManager[_0x33bfdc(0x3e0)]();},Window_ActorCommand['prototype'][_0x2beff5(0x376)]=function(){const _0x39de0a=_0x2beff5;if(!BattleManager[_0x39de0a(0x157)]())return![];if(!VisuMZ[_0x39de0a(0x39a)]['Settings'][_0x39de0a(0x20c)][_0x39de0a(0x3af)])return![];if(this[_0x39de0a(0x163)]&&this[_0x39de0a(0x163)][_0x39de0a(0x147)]())return![];return!![];},VisuMZ[_0x2beff5(0x39a)][_0x2beff5(0x3c1)]=Window_Selectable[_0x2beff5(0x2fe)][_0x2beff5(0x279)],Window_Selectable[_0x2beff5(0x2fe)][_0x2beff5(0x279)]=function(){const _0x1c7c95=_0x2beff5;if(this['isUsePageUpDnShortcutBTB']())this[_0x1c7c95(0x163)]&&!this['_actor'][_0x1c7c95(0x147)]()&&this['_actor'][_0x1c7c95(0x1df)]()&&SceneManager[_0x1c7c95(0x1f5)][_0x1c7c95(0x24d)]();else{if(_0x1c7c95(0x23f)===_0x1c7c95(0x23f))VisuMZ[_0x1c7c95(0x39a)][_0x1c7c95(0x3c1)][_0x1c7c95(0x354)](this);else return _0x277f8f(_0x9386d7['$1']);}},VisuMZ[_0x2beff5(0x39a)]['Window_Selectable_cursorPageup']=Window_Selectable['prototype'][_0x2beff5(0x38c)],Window_Selectable[_0x2beff5(0x2fe)]['cursorPageup']=function(){const _0x359f5b=_0x2beff5;if(this['isUsePageUpDnShortcutBTB']()){if(_0x359f5b(0x205)==='eKfuJ'){_0x142c8e[_0x359f5b(0x293)](_0x44c6b4,_0x532bfc);const _0x3c970d=_0x66d8bc[_0x359f5b(0x2e4)];_0x5786d0[_0x359f5b(0x308)](_0x3c970d);}else this[_0x359f5b(0x163)]&&!this[_0x359f5b(0x163)][_0x359f5b(0x147)]()&&this[_0x359f5b(0x163)][_0x359f5b(0x2a5)]()>0x1&&SceneManager[_0x359f5b(0x1f5)][_0x359f5b(0x3b6)]();}else VisuMZ['BattleSystemBTB'][_0x359f5b(0x261)]['call'](this);},Window_Selectable[_0x2beff5(0x2fe)][_0x2beff5(0x16f)]=function(){const _0x226465=_0x2beff5;if(this[_0x226465(0x398)]!==Window_ActorCommand)return![];if(!SceneManager[_0x226465(0x249)]())return![];if(!BattleManager[_0x226465(0x157)]())return![];return VisuMZ[_0x226465(0x39a)][_0x226465(0x3a4)][_0x226465(0x20c)]['BraveShortcuts'];},VisuMZ['BattleSystemBTB']['Window_ActorCommand_makeCommandList']=Window_ActorCommand[_0x2beff5(0x2fe)][_0x2beff5(0x3aa)],Window_ActorCommand[_0x2beff5(0x2fe)]['makeCommandList']=function(){const _0xb87ea=_0x2beff5;VisuMZ[_0xb87ea(0x39a)][_0xb87ea(0x348)][_0xb87ea(0x354)](this),this[_0xb87ea(0x296)]();},VisuMZ['BattleSystemBTB'][_0x2beff5(0x1ab)]=Window_Base[_0x2beff5(0x2fe)]['close'],Window_Base[_0x2beff5(0x2fe)][_0x2beff5(0x375)]=function(){const _0x551261=_0x2beff5;VisuMZ[_0x551261(0x39a)][_0x551261(0x1ab)][_0x551261(0x354)](this);if(SceneManager[_0x551261(0x249)]()&&this['destroyBTBActionCounters']){if(_0x551261(0x12f)!==_0x551261(0x1c5))this[_0x551261(0x140)]();else{if(_0x4cbec4['id']===this[_0x551261(0x167)]())return 0x0;if(this[_0x551261(0x3c5)]()&&this[_0x551261(0x3c5)]()['item']()===_0x535a51&&this[_0x551261(0x3c5)]()[_0x551261(0x235)])return 0x0;}}},Window_ActorCommand[_0x2beff5(0x2fe)][_0x2beff5(0x140)]=function(){const _0x4b7930=_0x2beff5;if(!this[_0x4b7930(0x3db)])return;this[_0x4b7930(0x3db)][_0x4b7930(0x2e5)]&&(_0x4b7930(0x381)!==_0x4b7930(0x2ea)?this[_0x4b7930(0x3db)][_0x4b7930(0x2e5)][_0x4b7930(0x386)]():(_0x428679[_0x4b7930(0x39a)][_0x4b7930(0x177)][_0x4b7930(0x354)](this,_0x800d6e),this[_0x4b7930(0x1e2)]()&&this[_0x4b7930(0x20e)]&&this[_0x4b7930(0x125)]())),this[_0x4b7930(0x257)](this[_0x4b7930(0x3db)]),delete this[_0x4b7930(0x3db)];},Window_ActorCommand['prototype'][_0x2beff5(0x296)]=function(){const _0x4b19b0=_0x2beff5;if(!BattleManager[_0x4b19b0(0x157)]())return;if(!this[_0x4b19b0(0x163)])return;this[_0x4b19b0(0x140)]();if(this[_0x4b19b0(0x163)]['hideBraveTrait']())return;this[_0x4b19b0(0x3db)]=new Sprite(),this['addChild'](this[_0x4b19b0(0x3db)]),this[_0x4b19b0(0x191)]();},Window_ActorCommand['prototype'][_0x2beff5(0x191)]=function(){const _0x4f4686=_0x2beff5,_0x3c28a2=VisuMZ[_0x4f4686(0x39a)][_0x4f4686(0x3a4)]['Window']['DrawActionCountersJS'];if(_0x3c28a2){if(_0x4f4686(0x2d3)===_0x4f4686(0x2d3))_0x3c28a2[_0x4f4686(0x354)](this,this[_0x4f4686(0x3db)],this,this[_0x4f4686(0x163)]);else return _0x28452d['x']-_0x89816a['x'];}else _0x4f4686(0x16d)!==_0x4f4686(0x29e)?this[_0x4f4686(0x3d4)][_0x4f4686(0x354)](this,this['_btbActionSprite'],this,this[_0x4f4686(0x163)]):(_0x4aff83[_0x4f4686(0x39a)]['Scene_Battle_createActorCommandWindow'][_0x4f4686(0x354)](this),this[_0x4f4686(0x119)]());},Window_ActorCommand['prototype'][_0x2beff5(0x3d4)]=function(){const _0x48cfd5=_0x2beff5,_0x5a12e4=arguments[0x0],_0x2c7d0c=arguments[0x1],_0x3b82c1=arguments[0x2];_0x5a12e4['x']=Math[_0x48cfd5(0x3ad)](_0x2c7d0c[_0x48cfd5(0x3cb)]/0x2),_0x5a12e4['y']=0x0,_0x5a12e4[_0x48cfd5(0x303)]['x']=0.5,_0x5a12e4[_0x48cfd5(0x303)]['y']=0.5;const _0x4c9631=TextManager['btbActionSlot'],_0x1e3dc3=TextManager[_0x48cfd5(0x14c)];let _0x9d4aff=_0x4c9631[_0x48cfd5(0x291)](_0x3b82c1[_0x48cfd5(0x2a5)]());const _0x3381f6=_0x3b82c1[_0x48cfd5(0x19d)];_0x9d4aff=_0x9d4aff[_0x48cfd5(0x141)](0x0,_0x3381f6)+_0x1e3dc3+_0x9d4aff[_0x48cfd5(0x141)](_0x3381f6+0x1);const _0x377a36=new Bitmap(_0x2c7d0c[_0x48cfd5(0x3cb)],_0x2c7d0c[_0x48cfd5(0x373)]());_0x377a36[_0x48cfd5(0x30a)]=0x24,_0x377a36[_0x48cfd5(0x335)](_0x9d4aff,0x0,0x0,_0x377a36[_0x48cfd5(0x3cb)],_0x377a36[_0x48cfd5(0x22d)],_0x48cfd5(0x32a)),_0x5a12e4[_0x48cfd5(0x2e5)]=_0x377a36;},Window_ActorCommand[_0x2beff5(0x2fe)]['isBattleItemWindowBTB']=function(){const _0x3543fa=_0x2beff5;return BattleManager[_0x3543fa(0x157)]();},Window_ActorCommand[_0x2beff5(0x2fe)][_0x2beff5(0x125)]=function(){const _0x3cd2bc=_0x2beff5,_0x422442=BattleManager[_0x3cd2bc(0x3c9)]();if(_0x422442){const _0x5133de=this[_0x3cd2bc(0x310)]();switch(_0x5133de){case _0x3cd2bc(0x206):_0x422442[_0x3cd2bc(0x349)]();break;case _0x3cd2bc(0x1e9):_0x422442['setGuard']();break;case'singleSkill':_0x422442[_0x3cd2bc(0x3a8)](this[_0x3cd2bc(0x313)]());break;default:_0x422442[_0x3cd2bc(0x3a8)](null);break;}}Window_Command[_0x3cd2bc(0x2fe)]['applyBattleItemWindowBTB']['call'](this);},Window_Base['prototype'][_0x2beff5(0x183)]=function(_0x4419ac,_0x37b735,_0x286f49,_0x5a472b,_0x253fb8){const _0x541e19=_0x2beff5;if(!_0x4419ac)return;if(!BattleManager[_0x541e19(0x157)]())return;const _0x223a30=VisuMZ[_0x541e19(0x39a)][_0x541e19(0x3a4)][_0x541e19(0x20c)],_0x4b3216=BattleManager[_0x541e19(0x29f)]()?_0x223a30['StatusPredictFmt']:_0x223a30[_0x541e19(0x31e)],_0x139db5=_0x223a30[_0x541e19(0x144)],_0x2a881e=_0x223a30[_0x541e19(0x323)],_0x13f9b1=_0x223a30[_0x541e19(0x321)];let _0x247521=0x0,_0x13ca50=0x0;_0x13ca50=_0x4419ac[_0x541e19(0x253)]();if(_0x13ca50>0x0)_0x247521=_0x2a881e;if(_0x13ca50===0x0)_0x247521=_0x139db5;if(_0x13ca50<0x0)_0x247521=_0x13f9b1;const _0x59de8c=_0x541e19(0x197)[_0x541e19(0x13d)](_0x247521,_0x13ca50),_0x4d1bc6=_0x541e19(0x202)[_0x541e19(0x13d)](ImageManager[_0x541e19(0x1b0)]);_0x13ca50=_0x4419ac[_0x541e19(0x2da)]();if(_0x13ca50>0x0)_0x247521=_0x2a881e;if(_0x13ca50===0x0)_0x247521=_0x139db5;_0x13ca50<0x0&&('Neeqg'!==_0x541e19(0x337)?_0x247521=_0x13f9b1:this[_0x541e19(0x3db)]['bitmap'][_0x541e19(0x386)]());const _0x50cffe='\x5cC[%1]%2\x5cC[0]'[_0x541e19(0x13d)](_0x247521,_0x13ca50);let _0x26cdc1=_0x4b3216[_0x541e19(0x13d)](_0x59de8c,TextManager[_0x541e19(0x33d)],_0x4d1bc6,_0x50cffe);const _0x40b34d=this[_0x541e19(0x196)](_0x26cdc1)[_0x541e19(0x3cb)];if(_0x253fb8===_0x541e19(0x32a))_0x37b735+=Math['round']((_0x5a472b-_0x40b34d)/0x2);else _0x253fb8===_0x541e19(0x139)&&(_0x37b735+=Math['round'](_0x5a472b-_0x40b34d));this[_0x541e19(0x36d)](_0x26cdc1,_0x37b735,_0x286f49,_0x5a472b);},Window_StatusBase[_0x2beff5(0x2fe)]['showBravePoints']=function(_0x4112bf){const _0x3673d4=_0x2beff5;if(!_0x4112bf)return![];if(!BattleManager[_0x3673d4(0x157)]())return![];if(!this[_0x3673d4(0x38a)])return![];if(_0x4112bf[_0x3673d4(0x147)]())return![];const _0x43bd8c=VisuMZ['BattleSystemBTB'][_0x3673d4(0x3a4)]['Window'],_0x4ceaa5=this['battleLayoutStyle']();return _0x43bd8c[_0x3673d4(0x285)[_0x3673d4(0x13d)](_0x4ceaa5)];},VisuMZ[_0x2beff5(0x39a)][_0x2beff5(0x3a1)]=Window_BattleStatus[_0x2beff5(0x2fe)][_0x2beff5(0x306)],Window_BattleStatus[_0x2beff5(0x2fe)][_0x2beff5(0x306)]=function(_0x8bbaa2){const _0x1da75b=_0x2beff5;VisuMZ['BattleSystemBTB'][_0x1da75b(0x3a1)][_0x1da75b(0x354)](this,_0x8bbaa2);const _0x7cee84=this['actor'](_0x8bbaa2);if(this[_0x1da75b(0x242)](_0x7cee84)){if(_0x1da75b(0x247)!=='UuafG'){if(!_0x373a64['isBTB']())return;const _0x50acc8=this['bravePointsCost'](_0x3db603);this[_0x1da75b(0x2ef)](_0x50acc8);}else{const _0x35d099=this[_0x1da75b(0x171)](_0x8bbaa2),_0x2b39a8=$dataSystem['optDisplayTp']?0x4:0x3,_0x5125c0=_0x2b39a8*0x80+(_0x2b39a8-0x1)*0x8+0x4;let _0x2d7946=_0x35d099['x']+this[_0x1da75b(0x356)];VisuMZ[_0x1da75b(0x34f)][_0x1da75b(0x3a4)][_0x1da75b(0x2ca)]['ShowFacesListStyle']?_0x1da75b(0x252)!==_0x1da75b(0x344)?_0x2d7946=_0x35d099['x']+ImageManager['faceWidth']+0x8:_0x2a22bf['_scene']['reduceBrave']():_0x2d7946+=ImageManager[_0x1da75b(0x12b)];const _0x1846e6=Math[_0x1da75b(0x3ad)](Math[_0x1da75b(0x25d)](_0x35d099['x']+_0x35d099[_0x1da75b(0x3cb)]-_0x5125c0,_0x2d7946));let _0x33e643=_0x1846e6+0x88,_0x4acd66=_0x35d099['y'];_0x33e643+=0x88*($dataSystem[_0x1da75b(0x34b)]?0x3:0x2),_0x33e643+=this[_0x1da75b(0x29b)](),_0x4acd66+=this[_0x1da75b(0x25b)]();const _0x37ac9b=this[_0x1da75b(0x37d)]();if(_0x33e643>_0x35d099['x']+_0x35d099[_0x1da75b(0x3cb)])return;this['drawActorBravePoints'](_0x7cee84,_0x33e643,_0x4acd66,_0x35d099['width'],_0x37ac9b);}}},VisuMZ[_0x2beff5(0x39a)][_0x2beff5(0x13c)]=Window_BattleStatus['prototype'][_0x2beff5(0x286)],Window_BattleStatus[_0x2beff5(0x2fe)][_0x2beff5(0x286)]=function(_0x40e909){const _0x503e8d=_0x2beff5;VisuMZ['BattleSystemBTB'][_0x503e8d(0x13c)]['call'](this,_0x40e909);const _0x2789cb=this[_0x503e8d(0x394)](_0x40e909);if(this[_0x503e8d(0x242)](_0x2789cb)){if('VxwlZ'===_0x503e8d(0x2ba))return this[_0x503e8d(0x1f0)](_0x1f87b8[_0x503e8d(0x324)](),0x9,!![]);else{const _0x35829e=this[_0x503e8d(0x13b)](_0x40e909);let _0x4d655e=_0x35829e['x'],_0x2c21c2=_0x35829e['y'];_0x4d655e+=this[_0x503e8d(0x29b)](),_0x2c21c2+=this[_0x503e8d(0x25b)]();const _0x4fab0c=this[_0x503e8d(0x37d)]();this[_0x503e8d(0x183)](_0x2789cb,_0x4d655e,_0x2c21c2,_0x35829e[_0x503e8d(0x3cb)],_0x4fab0c);}}},Window_BattleStatus[_0x2beff5(0x2fe)][_0x2beff5(0x13b)]=function(_0x570526){const _0x38a3dc=_0x2beff5,_0x124f9c=this[_0x38a3dc(0x3c0)](_0x570526);if(_0x124f9c[_0x38a3dc(0x3cb)]<ImageManager[_0x38a3dc(0x1fb)])return _0x124f9c;let _0x51af99=Math[_0x38a3dc(0x3ad)]((_0x124f9c['width']-ImageManager[_0x38a3dc(0x1fb)])/0x2);return _0x124f9c[_0x38a3dc(0x3cb)]=ImageManager[_0x38a3dc(0x1fb)],_0x124f9c['x']+=_0x51af99,_0x124f9c;},Window_BattleStatus[_0x2beff5(0x2fe)][_0x2beff5(0x37d)]=function(){const _0x452bf5=_0x2beff5,_0xe0c18b=VisuMZ[_0x452bf5(0x39a)][_0x452bf5(0x3a4)][_0x452bf5(0x20c)],_0x405f0a=this['battleLayoutStyle']();return _0xe0c18b[_0x452bf5(0x3ba)[_0x452bf5(0x13d)](_0x405f0a)]||0x0;},Window_BattleStatus[_0x2beff5(0x2fe)]['getOffsetX_BTB']=function(){const _0x142d0e=_0x2beff5,_0x59f687=VisuMZ[_0x142d0e(0x39a)][_0x142d0e(0x3a4)][_0x142d0e(0x20c)],_0x401f64=this[_0x142d0e(0x38a)]();return _0x59f687['%1_offsetX'[_0x142d0e(0x13d)](_0x401f64)]||0x0;},Window_BattleStatus[_0x2beff5(0x2fe)][_0x2beff5(0x25b)]=function(){const _0x169aee=_0x2beff5,_0x286ae5=VisuMZ[_0x169aee(0x39a)][_0x169aee(0x3a4)][_0x169aee(0x20c)],_0x1c4fdd=this[_0x169aee(0x38a)]();return _0x286ae5['%1_offsetY'['format'](_0x1c4fdd)]||0x0;},Window_BattleSkill['prototype'][_0x2beff5(0x1e2)]=function(){return BattleManager['isBTB']();},Window_BattleSkill[_0x2beff5(0x2fe)][_0x2beff5(0x125)]=function(){const _0x3fc31d=_0x2beff5,_0x547754=this[_0x3fc31d(0x274)](),_0x6c5756=BattleManager[_0x3fc31d(0x3c9)]();if(_0x6c5756)_0x6c5756['setSkill'](_0x547754?_0x547754['id']:null);Window_SkillList['prototype'][_0x3fc31d(0x125)][_0x3fc31d(0x354)](this);},Window_BattleItem['prototype'][_0x2beff5(0x1e2)]=function(){const _0x175978=_0x2beff5;return BattleManager[_0x175978(0x157)]();},Window_BattleItem[_0x2beff5(0x2fe)][_0x2beff5(0x125)]=function(){const _0x1c19af=_0x2beff5,_0x4a64f1=this[_0x1c19af(0x274)](),_0xea1764=BattleManager[_0x1c19af(0x3c9)]();if(_0xea1764)_0xea1764[_0x1c19af(0x198)](_0x4a64f1?_0x4a64f1['id']:null);Window_ItemList['prototype'][_0x1c19af(0x125)][_0x1c19af(0x354)](this);};function Window_BTB_TurnOrder(){const _0x30c100=_0x2beff5;this[_0x30c100(0x1c4)](...arguments);}Window_BTB_TurnOrder[_0x2beff5(0x2fe)]=Object[_0x2beff5(0x1b6)](Window_Base[_0x2beff5(0x2fe)]),Window_BTB_TurnOrder[_0x2beff5(0x2fe)][_0x2beff5(0x398)]=Window_BTB_TurnOrder,Window_BTB_TurnOrder['Settings']=VisuMZ[_0x2beff5(0x39a)][_0x2beff5(0x3a4)][_0x2beff5(0x255)],Window_BTB_TurnOrder[_0x2beff5(0x2fe)][_0x2beff5(0x1c4)]=function(){const _0x3207ee=_0x2beff5,_0x5327a5=this[_0x3207ee(0x263)]();this['initHomePositions'](_0x5327a5),Window_Base['prototype'][_0x3207ee(0x1c4)][_0x3207ee(0x354)](this,_0x5327a5),this[_0x3207ee(0x19e)](),this['updateVisibility'](),this[_0x3207ee(0x217)]=0x0;},Window_BTB_TurnOrder[_0x2beff5(0x2fe)][_0x2beff5(0x263)]=function(){const _0xdc2f59=_0x2beff5;return this[_0xdc2f59(0x1f0)]($gameParty[_0xdc2f59(0x324)](),0x9,!![]);},Window_BTB_TurnOrder['prototype']['initHomePositions']=function(_0x2d4d5b){const _0x2b21cd=_0x2beff5;this['_targetHomeX']=this[_0x2b21cd(0x346)]=_0x2d4d5b['x'],this['_targetHomeY']=this[_0x2b21cd(0x2f8)]=_0x2d4d5b['y'],this[_0x2b21cd(0x2e2)]=_0x2d4d5b['width'],this[_0x2b21cd(0x118)]=_0x2d4d5b[_0x2b21cd(0x22d)],this[_0x2b21cd(0x3bd)]=0x0;},Window_BTB_TurnOrder[_0x2beff5(0x2fe)][_0x2beff5(0x1f0)]=function(_0x1f00cc,_0xfadab2,_0x5347b8){const _0x1ff46e=_0x2beff5,_0x13dbe1=Window_BTB_TurnOrder['Settings'],_0x319ee3=this['isHorz']()?_0x13dbe1[_0x1ff46e(0x19a)]:_0x13dbe1['MaxVertSprites'],_0x254a14=Math[_0x1ff46e(0x25d)](_0x319ee3,_0x1f00cc+_0xfadab2),_0x25bea5=SceneManager[_0x1ff46e(0x1f5)][_0x1ff46e(0x1d2)]['height'],_0x24d5bb=SceneManager[_0x1ff46e(0x1f5)][_0x1ff46e(0x30b)][_0x1ff46e(0x22d)],_0x3c92b3=_0x13dbe1['SubjectDistance'],_0x5871e8=Graphics[_0x1ff46e(0x22d)]-_0x25bea5-_0x24d5bb;let _0x42a504=0x0,_0x1563dc=0x0,_0x184f3a=0x0,_0x130db1=0x0;switch(_0x13dbe1['DisplayPosition']){case _0x1ff46e(0x29d):_0x42a504=_0x13dbe1[_0x1ff46e(0x1e8)]*_0x254a14+_0x3c92b3,_0x1563dc=_0x13dbe1[_0x1ff46e(0x3a0)],_0x184f3a=Math['ceil']((Graphics[_0x1ff46e(0x3cb)]-_0x42a504)/0x2),_0x130db1=_0x13dbe1[_0x1ff46e(0x10d)];break;case'bottom':_0x42a504=_0x13dbe1[_0x1ff46e(0x1e8)]*_0x254a14+_0x3c92b3,_0x1563dc=_0x13dbe1[_0x1ff46e(0x3a0)],_0x184f3a=Math['ceil']((Graphics[_0x1ff46e(0x3cb)]-_0x42a504)/0x2),_0x130db1=Graphics[_0x1ff46e(0x22d)]-_0x25bea5-_0x1563dc-_0x13dbe1[_0x1ff46e(0x10d)];break;case _0x1ff46e(0x2dc):_0x42a504=_0x13dbe1[_0x1ff46e(0x3a0)],_0x1563dc=_0x13dbe1['SpriteThin']*_0x254a14+_0x3c92b3,_0x184f3a=_0x13dbe1[_0x1ff46e(0x10d)],_0x130db1=Math['ceil']((_0x5871e8-_0x1563dc)/0x2),_0x130db1+=_0x24d5bb;break;case _0x1ff46e(0x139):_0x42a504=_0x13dbe1[_0x1ff46e(0x3a0)],_0x1563dc=_0x13dbe1[_0x1ff46e(0x1e8)]*_0x254a14+_0x3c92b3,_0x184f3a=Graphics['width']-_0x42a504-_0x13dbe1[_0x1ff46e(0x10d)],_0x130db1=Math[_0x1ff46e(0x3cf)]((_0x5871e8-_0x1563dc)/0x2),_0x130db1+=_0x24d5bb;break;}if(!_0x5347b8){const _0x374d1d=Window_BTB_TurnOrder[_0x1ff46e(0x3a4)]['OrderDirection'];let _0x345704=Math['min'](_0x319ee3,Math[_0x1ff46e(0x25d)]($gameParty['maxBattleMembers']()+0x8)-_0x254a14);switch(_0x13dbe1[_0x1ff46e(0x214)]){case _0x1ff46e(0x29d):case _0x1ff46e(0x277):_0x374d1d&&(_0x1ff46e(0x130)!==_0x1ff46e(0x130)?_0x45d4bc+=_0x4fd51c(_0x1d6c84['$1']):_0x184f3a-=_0x345704*_0x13dbe1[_0x1ff46e(0x1e8)]);break;}}return _0x184f3a+=_0x13dbe1[_0x1ff46e(0x232)],_0x130db1+=_0x13dbe1[_0x1ff46e(0x35f)],new Rectangle(_0x184f3a,_0x130db1,_0x42a504,_0x1563dc);},Window_BTB_TurnOrder[_0x2beff5(0x2fe)]['updatePadding']=function(){const _0x5978d7=_0x2beff5;this[_0x5978d7(0x356)]=0x0;},Window_BTB_TurnOrder[_0x2beff5(0x2fe)][_0x2beff5(0x19f)]=function(){const _0x40855d=_0x2beff5,_0x5c3bac=Window_BTB_TurnOrder['Settings'],_0x43ff70=[_0x40855d(0x29d),_0x40855d(0x277)][_0x40855d(0x359)](_0x5c3bac[_0x40855d(0x214)]);return _0x43ff70;},Window_BTB_TurnOrder[_0x2beff5(0x2fe)]['createBattlerSprites']=function(){const _0x37d09b=_0x2beff5;this[_0x37d09b(0x2b1)]=new Sprite(),this['addInnerChild'](this[_0x37d09b(0x2b1)]),this[_0x37d09b(0x262)]=[];for(let _0x2e21a1=0x0;_0x2e21a1<$gameParty[_0x37d09b(0x324)]();_0x2e21a1++){const _0x418098=new Sprite_BTB_TurnOrder_Battler($gameParty,_0x2e21a1);this[_0x37d09b(0x2b1)]['addChild'](_0x418098),this[_0x37d09b(0x262)][_0x37d09b(0x301)](_0x418098);}for(let _0x46d3d3=0x0;_0x46d3d3<$gameTroop['members']()[_0x37d09b(0x2f9)];_0x46d3d3++){if('YDtDA'!==_0x37d09b(0x331)){const _0x3cba96=new Sprite_BTB_TurnOrder_Battler($gameTroop,_0x46d3d3);this[_0x37d09b(0x2b1)]['addChild'](_0x3cba96),this[_0x37d09b(0x262)][_0x37d09b(0x301)](_0x3cba96);}else this[_0x37d09b(0x1b2)]();}},Window_BTB_TurnOrder['prototype'][_0x2beff5(0x20f)]=function(){const _0x3caeb4=_0x2beff5;Window_Base['prototype'][_0x3caeb4(0x20f)][_0x3caeb4(0x354)](this),this[_0x3caeb4(0x12c)](),this[_0x3caeb4(0x276)](),this[_0x3caeb4(0x383)](),this[_0x3caeb4(0x31c)](),this[_0x3caeb4(0x28a)]();},Window_BTB_TurnOrder['prototype'][_0x2beff5(0x12c)]=function(){const _0xcd03cb=_0x2beff5;if(this[_0xcd03cb(0x3bd)]>0x0){const _0x171e2a=this['_homeDuration'];this[_0xcd03cb(0x346)]=(this[_0xcd03cb(0x346)]*(_0x171e2a-0x1)+this[_0xcd03cb(0x143)])/_0x171e2a,this['_homeY']=(this[_0xcd03cb(0x2f8)]*(_0x171e2a-0x1)+this[_0xcd03cb(0x28b)])/_0x171e2a,this[_0xcd03cb(0x3bd)]--,this['_homeDuration']<=0x0&&('EHitj'===_0xcd03cb(0x2c0)?(this[_0xcd03cb(0x38d)](),this[_0xcd03cb(0x231)]=0x0,this[_0xcd03cb(0x276)](),this[_0xcd03cb(0x217)]=this[_0xcd03cb(0x26f)]):(this[_0xcd03cb(0x346)]=this[_0xcd03cb(0x143)],this[_0xcd03cb(0x2f8)]=this['_targetHomeY']));}},Window_BTB_TurnOrder[_0x2beff5(0x2fe)][_0x2beff5(0x276)]=function(){const _0xc397f2=_0x2beff5,_0x24c391=Window_BTB_TurnOrder['Settings'];if(_0x24c391[_0xc397f2(0x214)]!==_0xc397f2(0x29d))return;if(!_0x24c391[_0xc397f2(0x304)])return;const _0x56b3e8=SceneManager[_0xc397f2(0x1f5)][_0xc397f2(0x30b)];if(!_0x56b3e8)return;if(_0x56b3e8[_0xc397f2(0x36c)]){if(_0xc397f2(0x1e1)==='CsuVG'){const _0x21573b=this[_0xc397f2(0x371)]();if(this[_0xc397f2(0x173)]===_0x21573b)return;this['_position']=_0x21573b;this[_0xc397f2(0x217)]<0xff&&this[_0xc397f2(0x1dd)]()&&_0x21573b!==this[_0xc397f2(0x2d8)]()&&this[_0xc397f2(0x152)](0xff);if(_0x21573b===this[_0xc397f2(0x2d8)]()&&this[_0xc397f2(0x11a)]<=0x0&&this['opacity']>0x0)this[_0xc397f2(0x152)](0x0);else this[_0xc397f2(0x11a)]<=0x0&&this[_0xc397f2(0x217)]<0xff&&this[_0xc397f2(0x1bc)]();this['calculateTargetPositions']();}else this['x']=this[_0xc397f2(0x346)]+(_0x24c391[_0xc397f2(0x3b2)]||0x0),this['y']=this['_homeY']+(_0x24c391[_0xc397f2(0x20a)]||0x0);}else this['x']=this['_homeX'],this['y']=this[_0xc397f2(0x2f8)];const _0x41efba=SceneManager[_0xc397f2(0x1f5)][_0xc397f2(0x39b)];this[_0xc397f2(0x1e0)]===undefined&&(_0xc397f2(0x17a)===_0xc397f2(0x184)?_0x3c502c[_0xc397f2(0x218)]():(this[_0xc397f2(0x1e0)]=Math[_0xc397f2(0x3ad)]((Graphics[_0xc397f2(0x3cb)]-Math[_0xc397f2(0x25d)](Graphics[_0xc397f2(0x332)],_0x41efba[_0xc397f2(0x3cb)]))/0x2),this['_ogWindowLayerY']=Math[_0xc397f2(0x3ad)]((Graphics[_0xc397f2(0x22d)]-Math[_0xc397f2(0x25d)](Graphics[_0xc397f2(0x1c6)],_0x41efba['height']))/0x2))),this['x']+=_0x41efba['x']-this[_0xc397f2(0x1e0)],this['y']+=_0x41efba['y']-this['_ogWindowLayerY'];},Window_BTB_TurnOrder['prototype']['updateSidePosition']=function(){const _0x28f6f8=_0x2beff5,_0x2a53c4=Window_BTB_TurnOrder[_0x28f6f8(0x3a4)];if([_0x28f6f8(0x29d)][_0x28f6f8(0x359)](_0x2a53c4['DisplayPosition']))return;this['x']=this[_0x28f6f8(0x346)],this['y']=this[_0x28f6f8(0x2f8)];const _0xa082fc=SceneManager[_0x28f6f8(0x1f5)][_0x28f6f8(0x39b)];this['x']+=_0xa082fc['x'],this['y']+=_0xa082fc['y'];},Window_BTB_TurnOrder[_0x2beff5(0x2fe)]['updateBattleContainerOrder']=function(){const _0x3d8999=_0x2beff5;if(!this[_0x3d8999(0x2b1)])return;const _0x517a10=this[_0x3d8999(0x2b1)][_0x3d8999(0x329)];if(!_0x517a10)return;_0x517a10[_0x3d8999(0x316)](this[_0x3d8999(0x287)][_0x3d8999(0x272)](this));},Window_BTB_TurnOrder['prototype'][_0x2beff5(0x287)]=function(_0x25c7b5,_0x2bc6e3){const _0x5689a9=_0x2beff5,_0x464288=this['isHorz'](),_0x19d4f3=Window_BTB_TurnOrder['Settings'][_0x5689a9(0x37b)];if(_0x464288&&!_0x19d4f3)return _0x25c7b5['x']-_0x2bc6e3['x'];else{if(_0x464288&&_0x19d4f3)return _0x2bc6e3['x']-_0x25c7b5['x'];else{if(!_0x464288&&_0x19d4f3){if('MlZah'===_0x5689a9(0x3cd))this[_0x5689a9(0x3d4)][_0x5689a9(0x354)](this,this[_0x5689a9(0x3db)],this,this[_0x5689a9(0x163)]);else return _0x25c7b5['y']-_0x2bc6e3['y'];}else{if(!_0x464288&&!_0x19d4f3){if(_0x5689a9(0x34a)==='VKTPa')return _0x2bc6e3['y']-_0x25c7b5['y'];else _0x3926c6[_0x5689a9(0x39a)][_0x5689a9(0x1ab)][_0x5689a9(0x354)](this),_0x336d5d['isSceneBattle']()&&this[_0x5689a9(0x140)]&&this[_0x5689a9(0x140)]();}}}}},Window_BTB_TurnOrder[_0x2beff5(0x2fe)][_0x2beff5(0x28a)]=function(){const _0x546cec=_0x2beff5;this[_0x546cec(0x36c)]=$gameSystem[_0x546cec(0x2ce)]();},Window_BTB_TurnOrder[_0x2beff5(0x2fe)][_0x2beff5(0x3b0)]=function(_0x4fff82){const _0x29418b=_0x2beff5;this[_0x29418b(0x262)][_0x29418b(0x316)]((_0x23a117,_0x32977e)=>{const _0x37dc88=_0x29418b;return _0x23a117['containerPosition']()-_0x32977e[_0x37dc88(0x371)]();}),this[_0x29418b(0x1e6)]();if(!_0x4fff82)return;for(const _0x550d9c of this['_turnOrderContainer']){if('gngAN'==='GduYE')this[_0x29418b(0x3c5)]()[_0x29418b(0x198)](_0x5ce7ea);else{if(!_0x550d9c)continue;_0x550d9c[_0x29418b(0x20f)](),_0x550d9c[_0x29418b(0x231)]=0x0;}}},Window_BTB_TurnOrder['prototype'][_0x2beff5(0x1e6)]=function(){const _0xbf03b7=_0x2beff5;if(!this[_0xbf03b7(0x19f)]())return;const _0x1e9cec=VisuMZ[_0xbf03b7(0x39a)][_0xbf03b7(0x3a4)][_0xbf03b7(0x255)];if(!_0x1e9cec[_0xbf03b7(0x15b)])return;const _0x5b1c32=$gameParty['members']()[_0xbf03b7(0x307)](_0x2e54f9=>_0x2e54f9&&_0x2e54f9['isAlive']()&&_0x2e54f9['isAppeared']())[_0xbf03b7(0x2f9)],_0x2ebf72=$gameTroop[_0xbf03b7(0x1ad)]()[_0xbf03b7(0x307)](_0x59d456=>_0x59d456&&_0x59d456[_0xbf03b7(0x1a5)]()&&_0x59d456[_0xbf03b7(0x211)]())[_0xbf03b7(0x2f9)],_0x2049cd=this[_0xbf03b7(0x1f0)](_0x5b1c32,_0x2ebf72);this[_0xbf03b7(0x143)]=_0x2049cd['x'],this[_0xbf03b7(0x28b)]=_0x2049cd['y'],(this['_targetHomeX']!==this['_homeX']||this['_targetHomeY']!==this[_0xbf03b7(0x2f8)])&&(this[_0xbf03b7(0x3bd)]=_0x1e9cec[_0xbf03b7(0x124)]);};