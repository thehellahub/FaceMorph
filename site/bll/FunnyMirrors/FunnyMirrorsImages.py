import cv2
import numpy as np
import math
from vcam import vcam,meshGen
import sys
import os
from shutil import copyfile
from shutil import move
import time
import glob

class FunnyMirrors:
    def main(filename,mode):

        this_scripts_path = os.path.dirname(os.path.realpath(__file__))

        mode = int(mode)-1

        # Reading the input image
        img = cv2.imread(this_scripts_path + "/data/" + filename + ".jpg")

        #img = cv2.resize(img,(300,300))
        H,W = img.shape[:2]

        # Creating the virtual camera object
        c1 = vcam(H=H,W=W)

        # Creating the surface object
        plane = meshGen(H,W)

        # We generate a mirror where for each 3D point, its Z coordinate is defined as Z = F(X,Y)
        if mode == 0:
            plane.Z += 20*np.exp(-0.5*((plane.X*1.0/plane.W)/0.1)**2)/(0.1*np.sqrt(2*np.pi))
        elif mode == 1:
            plane.Z += 20*np.exp(-0.5*((plane.Y*1.0/plane.H)/0.1)**2)/(0.1*np.sqrt(2*np.pi))
        elif mode == 2:
            plane.Z -= 10*np.exp(-0.5*((plane.X*1.0/plane.W)/0.1)**2)/(0.1*np.sqrt(2*np.pi))
        elif mode == 3:
            plane.Z -= 10*np.exp(-0.5*((plane.Y*1.0/plane.W)/0.1)**2)/(0.1*np.sqrt(2*np.pi))
        elif mode == 4:
            plane.Z += 20*np.sin(2*np.pi*((plane.X-plane.W/4.0)/plane.W)) + 20*np.sin(2*np.pi*((plane.Y-plane.H/4.0)/plane.H))
        elif mode == 5:
            plane.Z -= 20*np.sin(2*np.pi*((plane.X-plane.W/4.0)/plane.W)) - 20*np.sin(2*np.pi*((plane.Y-plane.H/4.0)/plane.H))
        elif mode == 6:
            plane.Z += 100*np.sqrt((plane.X*1.0/plane.W)**2+(plane.Y*1.0/plane.H)**2)
        elif mode == 7:
            plane.Z -= 100*np.sqrt((plane.X*1.0/plane.W)**2+(plane.Y*1.0/plane.H)**2)
        else:
            print("Wrong mode selected")
            exit(-1)

        # Extracting the generated 3D plane
        pts3d = plane.getPlane()

        # Projecting (Capturing) the plane in the virtual camera
        pts2d = c1.project(pts3d)

        # Deriving mapping functions for mesh based warping.
        map_x,map_y = c1.getMaps(pts2d)

        # Generating the output
        output = cv2.remap(img,map_x,map_y,interpolation=cv2.INTER_LINEAR)
        output = cv2.flip(output,1)

        # cv2.imshow("Funny Mirror",output)
        # #cv2.imshow("Input and output",np.hstack((img,np.zeros((H,2,3),dtype=np.uint8),output)))
        # # Uncomment following line to save the outputs
        # # cv2.imwrite("Mirror-effect-%d-image-%d.jpg"%(mode+1,i+1),np.hstack((img,np.zeros((H,2,3),dtype=np.uint8),output)))
        # cv2.waitKey(0)

        # Name of saved file
        filename = "output_image." + str(time.time()) + ".jpg"

        # Doesn't work for some reason?
        # # Using cv2.imwrite() method
        # # Saving the image in filepath
        # filepath = this_scripts_path + '../../static/output_image.jpg'
        # cv2.imwrite(os.path.join(filepath , filename), imgMorph) 
        # print(filepath)
        # print(filename)
        # print(os.path.join(filepath , filename))
          
        # Using cv2.imwrite() method
        # Saving the image in site dir
        cv2.imwrite(filename, output)

        # Removing any potentially already-existing output_image.jpg file in the static folder
        try:
            for fl in glob.glob(this_scripts_path+"/../../static/output_image*.jpg"):
                #Do what you want with the file
                os.remove(fl)
        except Exception as e:
            print(e)

        # Moving saved image to static folder
        move(this_scripts_path+"/../../"+filename, this_scripts_path+"/../../static/")

        return filename