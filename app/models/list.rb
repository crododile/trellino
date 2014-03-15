# == Schema Information
#
# Table name: lists
#
#  id         :integer          not null, primary key
#  title      :string(255)      not null
#  rank       :integer          not null
#  board_id   :integer          not null
#  created_at :datetime
#  updated_at :datetime
#

class List < ActiveRecord::Base

  validates :title, :rank, :board_id, presence: true

  belongs_to :board
  has_many :cards, dependent: :destroy

  def to_builder
    Jbuilder.new do |list|
      list.id id
      list.title title
      list.rank rank
      list.board_id board_id
    end
  end
end
