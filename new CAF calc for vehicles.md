# Vehicle combat proposal

## Introduction

### Intent

Vehicles tend to be involved in Combat in two instances. The first is when infantry catch up with a vehicle and swarm it, attempting to disable it. The second is when cheap low-value transports (Rhinos, in our experience) charge expensive high-value tanks to tarpit and destroy them.

Neither of these things happen very often, but when they do, they are often a turning point.

Infantry vs vehicles feels dry and abstract. Vehicles's CAF is a single number, independent of the weapon loadout, and players point out that attacking a mobile fortress like a Baneblade from the front should be suicide. In addition, it is frustrating that a group of lightly armoured men with sharp sticks should be able to stop a hundred tonne armoured vehicle in its (literal) tracks.

Vehicle vs vehicle is even more dry. Yes, the vehicles are not really just bumping into each other, they are circling looking for weaknesses, letting off shots. However, the question 'how can this Rhino damage my Baneblade in close combat when it has no weapons which can scratch it in the shooting phase' is a reasonable one.

### Executive summary

This proposal has a number of new mechanics. It is for Vehicles and Super-heavy Vehicles only. When we use the word 'vehicle' (with a lower case 'v') we mean 'Vehicle or Super-heavy Vehicle'.

In a nut-shell, these are the proposals:

* A vehicle has a front and rear combat arc. Its CAF is different depending on which arc an enemy model is.
* A vehicle has a base CAF. Then each weapon provides a CAF bonus.
* Vehicles have new rules for charging which involve tank shock and turning.
* Units have new rules for charging, which involves encircling.

### A note on the length

There is a lot of maths here. However the intent is that all the maths can be pre-calculated and put on stat lines, rather than being calculated in-game. There is some book-keeping of weapons which have fired in a turn; this is, hopefully, no more complicated than keeping track of any other fired weapons. I have written several worked examples to make it clearer; you are free to skip those and it will all still make sense.

## Proposed new rules

### Combat Arc

A vehicle has a Front and Rear Combat Arc. Generally the Front Combat Arc is the more dangerous one, and represents the fact that a vehicle is more heavily armed and armoured at the front. The Front and Rear Combat Arcs are identical to the Front and Rear weapon Arc, and are discovered by drawing an imaginary line through the centre of a model or base.

An enemy model is in a vehicle's Rear Combat Arc unless it is fully in front of the imaginary line.

We write the CAF for the two Combat Arcs as e.g.

+1 CAF Front, -1 CAF Rear

This means that an engaged model wholly in the Front Combat Arc would be attacked with a CAF of +1; other models would be attacked with a CAF of -1.

We use the term 

+2 CAF All 

to indicate that the CAF can be applied in either Arc.

### New base CAF calculation for vehicles

A vehicle has a base CAF. This is calculated from the model stats. Obviously these would be pre-calculated in the game. To calculate you apply the following steps.

Start with -2 CAF Front, -3 CAF Rear.

If it's a Super-heavy Vehicle, modify by:
* +1 CAF Front, +1 CAF Rear

Then look at the list it comes from. Modify by:
* Legions: +1 CAF Front, +1 CAF Rear
* Auxilia: 0 CAF Front, 0 CAF Rear
* Everyone else: -1 CAF Front, -1 Rear

Then modify based on the armour save
* 6+: 0 CAF Front, 0 CAF Rear
* 5+: 0 CAF Front, 0 CAF Rear
* 4+: +1 CAF Front, 0 CAF Rear
* 3+: +1 CAF Front, +1 CAF Rear
* 2+: +2 CAF Front, +1 CAF Rear

If it has an invulnerable save, it gets a further addition
* 6+: +1 CAF Front +1 CAF Rear
* 5+: +2 CAF Front +2 CAF Rear

Worked examples:

A Rhino (has +0 CAF today).
* Start at: -2 CAF Front, -3 CAF Rear
* Crew modifier from legions: additional +1 CAF Front, +1 CAF Rear
* Armour modifier 4+: additional +1 CAF Front, 0 CAF Rear
* Net result is: 0 CAF Front, -2 CAF Rear

A Land Raider (has +2 CAF today).
* Start at: -2 CAF Front, -3 CAF Rear
* Crew modifier from legions: additional +1 CAF Front, +1 CAF Rear
* Armour modifier 2+: additional +2 CAF Front, +1 CAF Rear
* Net result is: +1 CAF Front, -1 CAF Rear

A Baneblade (has +4 CAF today).
* Start at: -2 CAF Front, -3 CAF Rear
* SHV modifier: additional +1 CAF Front, +1 CAF Rear
* Armour modifier 2+: additional +2 CAF Front, +1 CAF Rear
* Net result is: +1 CAF Front, -1 CAF Rear
  
Note that these are all lower than the existing CAFs, and will be supplemented by weapon CAF bonuses.

### Weapon CAF bonuses

Each weapon on a vehicle provides one or more CAF bonus. Each CAF bonus can be used once per turn. It may only be used on an enemy model within base contact, within the appropriate Arc as defined above.

If a weapon is used in combat, it may then not be fired later. Likewise, if it is fired, it may not be used in combat. If it has the Co-axial trait, it also can't be used if its paired weapon was used.

The bonus must be used in its entirety against a model, and may not be split. Multiple bonuses may be used against a single model. The bonus will be different depending on the model.

To calculate the weapon CAF bonuses, use the following formula. Again, these would be pre-calculated.

1. Discard any weapon with 
   1. Barrage, Blast, Bombing Run, Burrowing, Co-axial, Collapsing Singularity, Deflagrate, Graviton Pulse, Ignores Cover, Quake, Skyfire, Tracking, or Warp traits
   2. A min range > 0
2. Calculate a single bonus
   1. Use the shortest ranged stat-line
   2. If this stat line has the Light trait, the bonus is +1 + AP * -1 vs Infantry, Cavalry and Walkers
   3. If this stat line has the Light AT trait, the bonus is +1 + AP * -1 bonus vs Infantry, Cavalry and Walkers and +1 vs Vehicles, SHV, Knights and Titans
   4. If this stat line has the Anti-tank trait, the bonus is +1 vs Infantry, Cavalry and Walkers and +1 + AP * -1 vs Vehicles, SHV, Knights and Titans
   5. If this stat line has none of those, the bonus is +1 + AP * -1 against everything
   6. If this stat line has the Point Defence trait, it has an additional +1 against anything it can damage
3. Then calculate the number of bonuses
   1. The number of bonuses is the number of dice that the weapon has
   2. If it has the Assault trait, double its bonuses
   3. If it has the Arc (Front) trait, these are only available for the Front arc; if it has the Arc (Rear) trait, these are only available for the Rear arc

Worked examples:

A Rhino with a pintle mounted twin bolter
* pintle mounted twin bolter
  * Light AP0: +1 CAF vs Infantry, Cavalry and Walkers
  * Point Defence: increase to +2 CAF vs Infantry, Cavalry and Walkers
  * Dice 2: 2 bonuses
  * Assault: doubled to 4 bonuses
  * Arc (Front) makes it +2 CAF Front

This means that overall the Rhino has +0 Front CAF, -2 Rear CAF, with 4x +2 Front CAF bonuses vs Infantry, Cavalry and Walkers. 

This makes the Rhino significantly more scary when charged into infantry, but very fragile if attacked from behind.

A Land Raider with a melta.
* weapon bonus: Sponson Mounted twin-linked lascannon
  * Anti-tank AP-1: +1 CAF vs Infantry and Cavalry; +2 CAF vs Walkers, Vehicles and Super-heavy Vehicles
  * Dice 1: 1 bonus
  * Arc (Front)
* weapon bonus: Pintle Mounted multi-melta
  * Anti-tank AP-3: +1 CAF vs Infantry and Cavalry; +4 CAF vs Walkers, Vehicles and Super-heavy Vehicles
  * Front arc
  * Dice 1: 1 bonus
  * Arc (Front)
  
So the final CAF is +1 CAF Front, -1 CAF Rear with 
  * 1x bonus of +1 CAF Front vs Infantry and Cavalry; +2 CAF Front vs Walkers, Vehicles and Super-heavy Vehicles
  * 1x bonus of +1 CAF Front vs Infantry and Cavalry; +4 CAF Front vs Walkers, Vehicles and Super-heavy Vehicles
  
Here the multi-melta and lascannon makes the Land Raider extremely deadly against vehicles, but fairly harmless against smaller troops.

The Baneblade
* Weapon bonus: Hull Mounted demolisher cannon
  * Has the Ignores cover trait: discard
* Weapon bonus: Hull Mounted heavy bolter turret
  * Light AP0: +1 vs Infantry, Cavalry and Walkers
  * Point Defence trait: modify to +2 vs Infantry, Cavalry and Walkers
  * 2 dice: 2 bonuses
  * Front arc
* Weapon bonus: Lascannon sponson turrets
  * Anti-tank AP-1: +1 vs Infantry and Cavalry; +2 vs Walkers, Vehicles and Super-heavy Vehicles
  * 1 dice: 1 bonus
* Weapon bonus: Baneblade cannon
  * AP-3: +4 vs everything
  * 1 dice: 1 bonus
* Weapon bonus: Co-axial autocannon
  * Has the Co-axial trait: discard
* Weapon bonus: Baneblade autocannon sponsons
  * Light AT AP-1: +2 CAF All vs Infantry, Cavalry and Walkers, +1 CAF All vs Vehicles and Super-heavy Vehicles
  * Point Defence: +3 CAF All vs Infantry, Cavalry and Walkers, +2 CAF All vs Vehicles and Super-heavy Vehicles
  * 2 dice: 2 bonuses

So the final CAF is +1 Front, -1 Rear with 
  * 2x +2 CAF Front vs Infantry, Cavalry and Walkers
  * 1x +1 CAF All vs Infantry and Cavalry; +2 CAF All vs Walkers, Vehicles and Super-heavy Vehicles
  * 1x +4 CAF All vs everything
  * 2x +3 CAF All vs Infantry, Cavalry and Walkers, +2 CAF All vs Vehicles and Super-heavy Vehicles

The Baneblade is a monster. If you recall, it has a +4 CAF today; here its weapons mostly average out to that, but that one unit which gets shot at point blank with the Baneblade cannon won't be getting up any time soon. However, it is substantially weaker at the rear than at the front, and is vulnerable to being swarmed.

### Vehicle charge bonus

Normally a model gets a Charge bonus if it has traveled more than 1" into a Fight. 

Here we propose that a vehicle has a charge bonus which depends on the distance it has charged. This distance is the distance since it started its move, or since its last Tank Shock (see later), whichever is shorter. The charge bonus is only applied to enemies in the Front Arc.

* 0-0.5 distance of its full move: +0 CAF Front
* 0.5-1 distance: +1 CAF Front
* 1-1.5 distance: +2 CAF Front
* 1.5-2 distance: +3 CAF Front

This means that a vehicle plummeting into a packed group of units will cause them to have a bad day.

### Tank Shock

During its move a vehicle with a Charge order may make a special attack on an enemy Detachment, so long as that model is Infantry or Cavalry. This is known as a 'Tank Shock' attack.  In such a case the vehicle Detachment may take a double move even if it doesn't end its move in base combat with an enemy model.

First, the vehicle Detachment moves and then stops, touching enemy models. 

Next the target Detachment must make a decision. It can Stand and Fight, or Get Out of the Way.

If it chooses to Stand and Fight, it may fire Overwatch (if eligible). Then it immediately resolves a combat using the models which are in base contact. The player who has initiated the Tank Shock chooses the Fights.

If the target Detachment chooses to Get Out of the Way, it cannot fire Overwatch. The combat is resolved, as above, but with the following CAF bonuses.
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

If the vehicle Detachment suffers more Wounds than the enemy Detachment, it loses the Combat and must immediately take a morale test. If it fails, it immediately Withdraws and does not complete its move. 

If the enemy Detachment takes more wounds than the vehicle Detachment, it must immediately take a morale test. If it fails, it immediately Withdraws.

If the vehicle Detachment survives and does not Withdraw, it continues its move, moving through any remaining models in the Tank Shocked Detachment as if they were not there.

A Detachment may make many Tank Shock attacks per movement phase; it may also end its charge in Combat after a Tank Shock. However, subsequent Tank Shocks within the same movement phase have a -1 CAF penalty for each previous Tank Shock; the final Combat has the same penalty. A Detachment may not Tank Shock a single Detachment more than once, nor may it end its move in base-to-base contact with a unit it has previously Tank Shocked. Any weapon CAF bonus used in a Tank Shock is used for the turn and may not be used in subsequent Tank Shocks or Combats that turn, nor may it be fired later.

Tank Shocks may be used to leave Combat. In this case the targeted Detachment may not fire Overwatch, the vehicle gets no Charge bonus, and the vehicle may not make a double distance move.

### Encircle move

An Infantry, Cavalry or Walker model with a Charge order which is Engaged with a vehicle may make an Encircle move. An Encircle move is instead of a normal move.

This represents infantry swarming around a vehicle looking for weaknesses.

In this move, the models move around the vehicle. They must
* Not leave base-to-base contact with any enemy models they are already in base-to-base contact with
* Not move through an enemy model
* Not end in base-to-base contact with an enemy model they did not start in base-to-base contact with

A model with the Skimmer or Jump Packs special rule may ignore the second clause, and may move through enemy models as if they were not there. It must still end its Encircle move in base-to-base contact with same the models it started.

Encircle moves can be combined with Pile-in moves. That is, a Detachment may have some of its models Encircle, and some Pile-in.

### Turn move

A vehicle with a Charge order which is in base-to-base contact with any other unit may make a Turn move. This is instead of a normal move, and prevents it from Tank Shocking, and does not give it a Charge bonus. In this move, the vehicle is simply turned to face any direction. It must end in base-to-base contact with all the units it started with. This represents a vehicle rotating to face all its guns at an enemy.