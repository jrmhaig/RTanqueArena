# Camper: Sitting Duck
#
class SittingDuck < RTanque::Bot::Brain
  NAME = 'Sitting Duck'
  include RTanque::Bot::BrainHelper

  def tick!
    command.speed = [MAX_BOT_SPEED, sensors.position.distance(target_position)/100.0].min
    @desired_angle = sensors.position.heading(target_position)
    command.heading = @desired_angle
    command.radar_heading = sensors.radar_heading + MAX_RADAR_ROTATION
    command.turret_heading = sensors.turret_heading - MAX_TURRET_ROTATION
  end

  def target_position
    @target_position = nil if Random.rand(10000) < 5
    @target_position ||= RTanque::Point.new Random.rand(arena.width),
                                            Random.rand(arena.height),
                                            arena
  end
end
