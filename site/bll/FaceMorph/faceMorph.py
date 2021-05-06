import numpy as np
import cv2
import sys
import os
from shutil import copyfile
from shutil import move
import time
import glob

class FaceMorph:

    # Read points from text file
    def readPoints(path) :
        # Create an array of points.
        points = [];
        # Read points
        with open(path) as file :
            for line in file :
                x, y = line.split()
                points.append((int(x), int(y)))

        return points

    # Apply affine transform calculated using srcTri and dstTri to src and
    # output an image of size.
    def applyAffineTransform(src, srcTri, dstTri, size) :
        
        # Given a pair of triangles, find the affine transform.
        warpMat = cv2.getAffineTransform( np.float32(srcTri), np.float32(dstTri) )
        
        # Apply the Affine Transform just found to the src image
        dst = cv2.warpAffine( src, warpMat, (size[0], size[1]), None, flags=cv2.INTER_LINEAR, borderMode=cv2.BORDER_REFLECT_101 )

        return dst


    # Warps and alpha blends triangular regions from img1 and img2 to img
    def morphTriangle(img1, img2, img, t1, t2, t, alpha) :

        # Find bounding rectangle for each triangle
        r1 = cv2.boundingRect(np.float32([t1]))
        r2 = cv2.boundingRect(np.float32([t2]))
        r = cv2.boundingRect(np.float32([t]))

        # Offset points by left top corner of the respective rectangles
        t1Rect = []
        t2Rect = []
        tRect = []

        for i in range(0, 3):
            tRect.append(((t[i][0] - r[0]),(t[i][1] - r[1])))
            t1Rect.append(((t1[i][0] - r1[0]),(t1[i][1] - r1[1])))
            t2Rect.append(((t2[i][0] - r2[0]),(t2[i][1] - r2[1])))

        # Get mask by filling triangle
        mask = np.zeros((r[3], r[2], 3), dtype = np.float32)
        cv2.fillConvexPoly(mask, np.int32(tRect), (1.0, 1.0, 1.0), 16, 0);

        # Apply warpImage to small rectangular patches
        img1Rect = img1[r1[1]:r1[1] + r1[3], r1[0]:r1[0] + r1[2]]
        img2Rect = img2[r2[1]:r2[1] + r2[3], r2[0]:r2[0] + r2[2]]

        size = (r[2], r[3])
        warpImage1 = FaceMorph.applyAffineTransform(img1Rect, t1Rect, tRect, size)
        warpImage2 = FaceMorph.applyAffineTransform(img2Rect, t2Rect, tRect, size)

        # Alpha blend rectangular patches
        imgRect = (1.0 - alpha) * warpImage1 + alpha * warpImage2

        # Copy triangular region of the rectangular patch to the output image
        img[r[1]:r[1]+r[3], r[0]:r[0]+r[2]] = img[r[1]:r[1]+r[3], r[0]:r[0]+r[2]] * ( 1 - mask ) + imgRect * mask

        return img

    def main(filename1,filename2):

        this_scripts_path = os.path.dirname(os.path.realpath(__file__))

        filename1 += '.jpg'
        filename2 += '.jpg'
        alpha = 0.5
        
        # Read images
        img1 = cv2.imread(this_scripts_path + "/" + filename1);
        img2 = cv2.imread(this_scripts_path + "/" + filename2);
        
        # Convert Mat to float data type
        img1 = np.float32(img1)
        img2 = np.float32(img2)

        # Read array of corresponding points
        points1 = FaceMorph.readPoints(this_scripts_path + "/" + filename1 + '.txt')
        points2 = FaceMorph.readPoints(this_scripts_path + "/" + filename2 + '.txt')
        points = [];

        # Compute weighted average point coordinates
        for i in range(0, len(points1)):
            x = ( 1 - alpha ) * points1[i][0] + alpha * points2[i][0]
            y = ( 1 - alpha ) * points1[i][1] + alpha * points2[i][1]
            points.append((x,y))


        # Allocate space for final output
        imgMorph = np.zeros(img1.shape, dtype = img1.dtype)

        # Read triangles from tri.txt
        with open(this_scripts_path + "/" + "tri.txt") as file :
            for line in file :
                x,y,z = line.split()
                
                x = int(x)
                y = int(y)
                z = int(z)
                
                t1 = [ points1[x], points1[y], points1[z]]
                t2 = [ points2[x], points2[y], points2[z]]
                t =  [ points[x],  points[y],  points[z] ]

                # Morph one triangle at a time.
                FaceMorph.morphTriangle(img1, img2, imgMorph, t1, t2, t, alpha)        

        # Name of saved file
        filename = "output_image.jpg"

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
        cv2.imwrite(filename, imgMorph)

        # Removing any potentially already-existing output_image.jpg file in the static folder
        try:
            for fl in glob.glob(this_scripts_path+"/../../static/output_image*.jpg"):
                #Do what you want with the file
                os.remove(fl)
        except Exception as e:
            print(e)
            

        # Moving saved image to static folder
        move(this_scripts_path+"/../../"+filename, this_scripts_path+"/../../static/")