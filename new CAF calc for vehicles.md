# Vehicle combat proposal

## Introduction

### Intent

Vehicles tend to be involved in Combat in two instances. The first is when infantry catch up with a vehicle and swarm it, attempting to disable it. The second is when cheap low-value transports (Rhinos, in our experience) charge expensive high-value tanks to tarpit and destroy them.

Neither of these things happen very often, but when they do, they are often a turning point.

Infantry vs vehicles feels dry and abstract. Vehicles's CAF is a single number, independent of the weapon loadout, and players point out that attacking a mobile fortress like a Baneblade from the front should be suicide. In addition, it is frustrating that a group of lightly armoured men with sharp sticks should be able to stop a hundred tonne armoured vehicle in its (literal) tracks.

Vehicle vs vehicle is even more dry. Yes, the vehicles are not really just bumping into each other, they are circling looking for weaknesses, letting off shots. However, the question 'how can this Rhino damage my Baneblade in close combat when it has no weapons which can scratch it in the shooting phase' is a reasonable one.

### Summary

This proposal has a number of new mechanics. It is for vehicles and super-heavy vehicles only. When we use the word 'vehicle' we mean 'vehicle or shv'.

* A vehicle has a front and rear combat arc. Its CAF is different depending on which arc an enemy model is.
* A vehicle has a base CAF. Then each weapon provides a CAF bonus.
* Vehicles have new rules for charging which involve tank shock and turning.
* Units have new rules for charging, which involves encircling.

### A note on the length

There is a lot of maths here. However the intent is that all the maths can be pre-calculated and put on stat lines, rather than being calculated in-game. There is some book-keeping of weapons which have fired in a turn; this is, hopefully, no more complicated than keeping track of any other fired weapons.

## New rules

### Combat Arc

A vehicle has a Front and Rear Combat Arc. Generally the Front Combat Arc is the more dangerous one, and represents the fact hat that vehicle is more heavily armed and armoured at the front. The Front Combat Arc is calculated using the same mechanisms as the Front weapon Arc, by drawing a line through the centre of a model.

An enemy model is in a vehicle's Rear Combat Arc unless it is fully in front of the line. This is also true for the purposes of Rear Combat Arc weapons.

### New base CAF calculation for vehicles

A vehicle or SHV has a base CAF. This is calculated from the model stats. Obviously these would be pre-calculated in the game. To calculate you apply the following steps

Start with:
* -2 front, -3 rear

If it's a super-heavy vehicle, add
* +1 front, +1 rear

Then look at the list it comes from (turns out having super soldiers in the crew is handy).
* Legions: +1 front, +1 rear
* Auxilia: 0 front, 0 rear
* Everyone else: -1 front, -1 rear

Then add based on the armour save
* 6+: 0 front, 0 rear
* 5+: 0 front, 0 rear
* 4+: +1 front, 0 rear
* 3+: +1 front, +1 rear
* 2+: +2 front, +1 rear

If it has an invulnerable save, it gets a further addition
* 6+: +1 front +1 rear
* 5+: +2 front +2 rear

Worked examples:

A Rhino (has +0 today).
* Start at: -2 front, -3 rear
* Crew modifier from legions: additional +1 front, +1 rear
* Armour modifier 4+: additional +1 front, 0 rear
* Net result is: 0 front, -2 rear

A Land Raider (has +2 today).
* Start at: -2 front, -3 rear
* Crew modifier from legions: additional +1 front, +1 rear
* Armour modifier 2+: additional +2 front, +1 rear
* Net result is: +1 front, -1 rear

A Baneblade (has +4 today).
* Start at: -2 front, -3 rear
* SHV modifier: additional +1 front, +1 rear
* Armour modifier 2+: additional +2 front, +1 rear
* Net result is: +1 front, -1 rear
  
Note that these are all lower than the existing CAFs, and will be supplemented by weapon CAF bonuses.

### Weapon CAF bonuses

Each weapon on a vehicle provides one or more CAF bonus. Each CAF bonus can be used once per turn. It may only be used on an enemy model within base contact, within the appropriate Arc as defined above.

If a weapon is used in combat, it may then not be fired later. Likewise, if it is fired, it may not be used in combat. If it has the Co-axial trait, it also can't be used if its paired weapon was used.

The bonus must be used in its entirety against a model, and may not be split. Multiple bonuses may be used against a single model. The bonus will be different depending on the model.

To calculate the weapon CAF bonuses, use the following formula. Again, these would be pre-calculated.

1. Discard any weapon with 
   1. Barrage, Blast, Bombing Run, Burrowing, Co-axial, Collapsing Singularity, Deflagrate, Graviton Pulse, Ignores Cover, Quake, Skyfire, Tracking, or Warp
   2. A min range > 0
2. Calculate a single bonus
   1. Use the shortest ranged stat-line
   2. If this stat line has the Light trait, the bonus is +1 + AP * -1 vs Infantry, Cavalry and Walker
   3. If this stat line has the Light AT trait, the bonus is +1 + AP * -1 bonus vs Infantry, Cavalry and Walker and +1 vs Vehicles, SHV, Knights and Titans
   4. If this stat line has the Anti-tank trait, the bonus is +1 vs Infantry, Cavalry and Walker and +1 + AP * -1 vs Vehicles, SHV, Knights and Titans
   5. If this stat line has none of those, the bonus is +1 + AP * -1 against everything
   6. If this stat line has the Point Defence trait, it has an additional +1 against anything it can damage
3. Then calculate the number of bonuses
   1. The number of bonuses is the number of dice that the weapon has
   2. If it has the Assault trait, double its bonuses
   3. If it has the Arc (Front) trait, these are only available for the Front arc; if it has the Arc (Rear) trait, these are only available for the Rear arc

Worked examples:

A Rhino with a pintle mounted twin bolter
* pintle mounted twin bolter
  * Light AP0: +1 vs infantry, cavalry and walkers
  * Point Defence: increase to +2 vs infantry, cavalry and walkers
  * Dice 2: 2 bonuses
  * Assault: doubled to 4 bonuses
  * Arc (Front)

This means that overall the Rhino has +0 front CAF, -2 rear CAF, with 4x +2 front CAF bonuses vs infantry, cavalry and walkers. 

A Land Raider with a melta.
* weapon bonus: Sponson Mounted twin-linked lascannon
  * Anti-tank AP-1: +1 vs infantry and cavalry; +2 vs walkers, vehicles and shvs
  * Dice 1: 1 bonus
  * Arc (Front)
* weapon bonus: Pintle Mounted multi-melta
  * Anti-tank AP-3: +1 vs infantry and cavalry; +4 vs walkers, vehicles and shvs
  * front arc
  * Dice 1: 1 bonus
  * Arc (Front)
  
So the final CAF is +1 front, -1 rear with 
  * 1x front bonus of +1 front vs infantry and cavalry; +2 front vs walkers, vehicles and shvs
  * 1x front bonus of +1 vs infantry and cavalry; +4 vs walkers, vehicles and shvs

The Baneblade
* Weapon bonus: Hull Mounted demolisher cannon
  * Has the Ignores cover trait: discard
* Weapon bonus: Hull Mounted heavy bolter turret
  * Light AP0: +1 vs infantry, cavalry and walkers
  * Point Defence trait: modify to +2 vs infantry, cavalry and walkers
  * 2 dice: 2 bonuses
  * front arc: 2 front bonuses
* Weapon bonus: Lascannon sponson turrets
  * Anti-tank AP-1: +1 vs infantry and cavalry; +2 vs walkers, vehicles and shvs
  * 1 dice: 1 bonus
* Weapon bonus: Baneblade cannon
  * AP-3: +4 vs everything
  * 1 dice: 1 bonus
* Weapon bonus: Co-axial autocannon
  * Has the Co-axial trait: discard
* Weapon bonus: Baneblade autocannon sponsons
  * Light AT AP-1: +2 vs infantry, cavalry and walkers, +1 vs vehicles and shvs
  * point Defence: +3 vs infantry, cavalry and walkers, +2 vs vehicles and shvs
  * 2 dice: 2 bonuses

So the final CAF is +1 front, -1 rear with 
  * 2x front bonus +2 vs infantry, cavalry and walkers
  * 1x all bonus +1 vs infantry and cavalry; +2 vs walkers, vehicles and shvs
  * 1x all bonus +4 vs everything
  * 2x all bonus +3 vs infantry, cavalry and walkers, +2 vs vehicles and shvs

### Tank Shock

A vehicle has a charge bonus which depends on the distance it has charged. This distance is the distance since it started its move, or since its last Tank Shock, whichever is shorter. The charge bonus is only applied to enemies in the front arc.

* 0-0.5 distance of its full move: +0 front
* 0.5-1 distance: +1 front
* 1-1.5 distance: +2 front
* 1.5-2 distance: +3 front

During its move a vehicle with a Charge order may make a special attack on an enemy detachment, so long as that model is Infantry or Cavalry. This is known as a 'Tank Shock' attack.  In such a case the vehicle detachment may take a double move even if it doesn't end its move in base combat with an enemy model.

First, the vehicle detachment moves and then stops, touching enemy models. 

Next the target detachment must make a decision. It can Stand and Fight, or Get Out of the Way.

If it chooses to Stand and Fight, it may fire Overwatch (if eligible). Then it immediately resolves a combat using the models which are in base contact. The player who has initiated the Tank Shock chooses the Fights.

If it chooses to Get Out of the Way, it cannot fire Overwatch. The combat is resolved, as above, but with the following CAF bonuses.
* +2 to all models
* an additional +2 if the target model has the Jump Packs or Skimmer special rules
* an additional -2 if the target model has the Bulky rule (note that Jump Packs are not considered to be Bulky for the purposes of this calculation)
* additional bonuses if the target model has the Jink (X) special rule
  * +1 if the target model has the Jink (6+) special rule
  * +2 if the target model has the Jink (5+) special rule
  * +3 if the target model has the Jink (4+) special rule
(Again, this can be pre-calculated.)

When a model chooses to Get Out of the Way, the best outcome it can get from the Fight is a tie -- that is, if its Fight roll is lower than the vehicle's Fight roll, it suffers a Wound, but if it is equal or higher, neither model suffers a Wound.

If the vehicle is destroyed, it is removed. If enemy models are destroyed, they are removed.

If the vehicle detachment suffers more Wounds than the enemy detachment, it loses the Combat and must immediately take a morale test. If it fails, it immediately Withdraws and does not complete its move. 

If the enemy detachment takes more wounds than the vehicle detachment, it must immediately take a morale test. If it fails, it immediately Withdraws.

If the vehicle detachment survives and retains its order, it continues its move, moving through any remaining models in the Tank Shocked detachment as if they were not there.

A detachment may make many Tank Shock attacks per movement phase; it may also end its charge in Combat after a Tank Shock. However, subsequent Tank Shocks within the same movement phase have a -1 CAF penalty for each previous Tank Shock; the final Combat has the same penalty. A detachment may not Tank Shock a single detachment more than once, nor may it end its move in base-to-base contact with a unit it has previously Tank Shocked. Any weapon CAF bonus used in a Tank Shock is used for the turn and may not be used in subsequent Tank Shocks or Combats that turn, nor may it be fired later.

Tank Shocks may be used to leave Combat. In this case the targeted detachment may not fire Overwatch, the vehicle gets no Charge bonus, and the vehicle may not make a double distance move.

### Encircle move

An infantry, cavalry or walker model with a Charge order which is Engaged with a vehicle may make an Encircle move. An Encircle move is instead of a normal move.

This represents infantry swarming around a vehicle looking for weaknesses.

In this move, the models move around the vehicle. They must
* Not leave base-to-base contact with any enemy models they are already in base-to-base contact with
* Not move through an enemy model
* Not end in base-to-base contact with an enemy model they did not start in base-to-base contact with

A unit with the Skimmer or Jump Packs special rule may ignore the second clause, and may move through enemy models as if they were not there. It must still end its Encircle move in base-to-base contact with same the models it started.

Encircle moves can be combined with Pile-in moves. That is, a detachment may have some of its models Encircle, and some Pile-in.

### Turn move

A vehicle with a Charge order which is in base-to-base contact with any other unit may make a Turn move. This is instead of a normal move, and prevents it from Tank Shocking, and does not give it a Charge bonus. In this move, the vehicle is simply turned to face any direction. It must end in base-to-base contact with all the units it started with. This represents a vehicle rotating to face all its guns at an enemy.