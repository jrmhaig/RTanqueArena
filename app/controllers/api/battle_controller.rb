require 'rtanque/runner'

class Api::BattleController < ApplicationController
  def index
    brain_paths = [
      'sample_bots/seek_and_destroy.rb',
      'sample_bots/camper.rb',
      'sample_bots/seek_and_destroy.rb',
      'sample_bots/camper.rb'
    ]

    runner = RTanque::Runner.new(
      width: 1200,
      height: 700,
      screen: 'data',
      max_ticks: Float::INFINITY,
      teams: false
    )

    brain_paths.each do |brain|
      runner.add_brain_path(brain)
    end
    render json: runner.start
  end
end
