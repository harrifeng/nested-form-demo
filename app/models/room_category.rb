class RoomCategory < ApplicationRecord
  belongs_to :hotel, required: false

  validates :name,
            presence: true

  def to_s
    name
  end
end
