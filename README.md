# Float Planner

The Float Planner is a tool written to help facilitate the planning of float trips.  I find it invaluable for safety to have a plan of distance to be covered each day along with satellite views and real time river flow data.  The Float Planner aims to centralize this important information.  This tool uses GeoJson data imported from the [USGS NLDI API](https://waterdata.usgs.gov/blog/nldi-intro/) to plot the streambed and streamside [NWIS](https://waterdata.usgs.gov/nwis) water monitoring sites on the map.  A user can select different points along the plotted line and the Float Planner will calculate the distance of each line segment as well as the total distance with the use of the Haversine formula which accounts for the curvature of the Earth.  Users are also presented with multiple map view options, overlays, and links to view realtime information of specific water monitoring sites along the river.

## This project is live!

Use it at [https://www.ozarkfloatplanner.com](https://www.ozarkfloatplanner.com)

## Usage

#### Initial User View with instructions
![image](https://user-images.githubusercontent.com/66268023/148668069-728cd22c-a0d9-441f-9e59-975212102969.png)

#### Select a river from the menu
![image](https://user-images.githubusercontent.com/66268023/148668186-a2179d37-dff4-4854-ba86-f0e05ead5d49.png)


#### A variety of different map views are available to select and different overlays can be shown or hidden:

![image](https://user-images.githubusercontent.com/66268023/117162815-bba14d00-ad88-11eb-8ce3-141800d6424e.png)

#### Topographical View:

![image](https://user-images.githubusercontent.com/66268023/117164323-22733600-ad8a-11eb-8c8e-2e359706d4c7.png)


#### Satellite View:

![image](https://user-images.githubusercontent.com/66268023/117164132-f5bf1e80-ad89-11eb-9f5e-db53221d0a89.png)

#### Satellite+Topographical View:

![image](https://user-images.githubusercontent.com/66268023/117164003-d2946f00-ad89-11eb-9223-6821af736783.png)

#### Example of measuring river distance:
![image](https://user-images.githubusercontent.com/66268023/148668106-35e945c5-113b-4f2c-b27e-13d92872aca4.png)



#### River Monitoring Station :
###### (links to USGS realtime monitoring information for selected site and displays coordinates)
![image](https://user-images.githubusercontent.com/66268023/148668122-c3840b73-3825-46ec-b5b1-c15b9c236b1e.png)


#### Mouseover markers to display coordinates:
![image](https://user-images.githubusercontent.com/66268023/148668144-977f4aed-2d4f-415a-94ce-218718dd8238.png)



#### Select a popular float to automatically display it on the map (deprecated):

![image](https://user-images.githubusercontent.com/66268023/117169148-7849dd00-ad8e-11eb-9ac3-36761a061e10.png)







## Next Steps
This tool has been released but is still under development as I learn more about software development. Some next steps that I aim to accomplish are:

- [x] create a backend to be allow users to select different rivers
- [x] display line segment color in legend when user is measuring distances
- [x] create a user friendly page around the map
- [x] deploy project to the public
	- [x] received over 1000 API requests on first day of launch
- [x] add mobile support
- [ ] create native mobile app
- [ ] advertise the use of this product to more groups in Missouri
- [ ] implement serverside caching using Redis
- [ ] use SCSS to make CSS easier 
