require 'rtanque/runner'

class Api::BattleController < ApplicationController
  def index
    battle_id = SecureRandom.hex

    brain_paths = [
      'sample_bots/seek_and_destroy.rb',
      'sample_bots/camper.rb',
      'sample_bots/seek_and_destroy.rb',
      'sample_bots/camper.rb',
      'bots/sitting_duck.rb',
      'bots/sitting_duck.rb',
      'bots/sitting_duck.rb'
    ]

    runner = RTanque::Runner.new(
      width: 1200,
      height: 700,
      screen: 'data',
      max_ticks: Float::INFINITY,
      #max_ticks: 1000,
      teams: false
    )

    battle = {}

    t = Time.zone.now
#    pid = fork do
      brain_paths.each do |brain|
        runner.add_brain_path(brain)
      end

      battle = runner.start
#    end

#    Timeout.timeout(2) do
#      Process.wait
#      puts "Finished after #{Time.zone.now - t}s"
#    rescue Timeout::Error
#      puts "Killing after #{Time.zone.now - t}s"
#      Process.kill 9, pid
#    end

    render json: battle
  end
end
