class Hotel < ApplicationRecord
  has_many :room_categories, dependent: :destroy

  accepts_nested_attributes_for :room_categories

  validates :name,
            presence: true

  def to_s
    name
  end
end
