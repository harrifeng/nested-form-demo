class HotelsController < ApplicationController
  before_action :set_hotel, only: [:show, :edit, :update, :destroy]

  # GET /hotels
  # GET /hotels.json
  def index
    @hotels = Hotel.all
    render component: 'Hotels', props: { hotels: @hotels}
  end

  # GET /hotels/1
  # GET /hotels/1.json
  def show
  end

  # GET /hotels/new
  def new
    @hotel = Hotel.new
    @hotel.room_categories.build
  end

  # GET /hotels/1/edit
  def edit
    @hotel.room_categories.build
  end

  # POST /hotels
  # POST /hotels.json
  def create
    @hotel = Hotel.new(hotel_params)

    respond_to do |format|
      if @hotel.save
        format.html { redirect_to @hotel, notice: 'Hotel was successfully created.' }
        format.json { render :json => @hotel }
      else
        format.html { render :new }
        format.json { render json: {:erros => @hotel.errors.messages}, :status => 442 }
      end
    end
  end

  # PATCH/PUT /hotels/1
  # PATCH/PUT /hotels/1.json
  def update
    respond_to do |format|
      if @hotel.update(hotel_params)
        format.html { redirect_to @hotel, notice: 'Hotel was successfully updated.' }
        format.json { render :show, status: :ok, location: @hotel }
      else
        format.html { render :edit }
        format.json { render json: @hotel.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /hotels/1
  # DELETE /hotels/1.json
  def destroy
    @hotel.destroy
    respond_to do |format|
      format.html { redirect_to hotels_url, notice: 'Hotel was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  def update_multiple
    params['hotels'].keys.each do |id|
      if params['hotels'][id]["added"]
        permit_params = params['hotels'][id].permit(:name)
        @new_hotel = Hotel.new(permit_params)
        @new_hotel.save
      else
        @hotel = Hotel.find(params['hotels'][id]["id"])
        permit_params = params['hotels'][id].permit(:name)
        @hotel.update_attributes(permit_params)
      end
    end
    @hotels = Hotel.all
    # render component: 'Hotels', props: { hotels: @hotels}, status: 200
    respond_to do |format|
      format.json { render json: {:props => @hotels}, :status => 200 }
    end
  end

  private
  # Use callbacks to share common setup or constraints between actions.
  def set_hotel
    @hotel = Hotel.find(params[:id])
  end

  # Never trust parameters from the scary internet, only allow the white list through.
  def hotel_params
    params.require(:hotel).permit(:name, room_categories_attributes: [:id, :name, :_destroy])
  end
end
