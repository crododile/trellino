class ChangeRankToFloat < ActiveRecord::Migration
  def change
    reversible do |dir|
      change_table :lists do |t|
        dir.up { t.change :rank, :float }
        dir.down { t.change :rank, :integer }
      end
    end
  end
end
