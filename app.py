#creates the imports for the app

import sqlite3
from flask import Flask,render_template, request, url_for, flash, redirect,session
from werkzeug.exceptions import abort

#create to the database
def get_db_connection():
    conn = sqlite3.connect('database.db')
    conn.row_factory = sqlite3.Row
    return conn

#make the apps work envirnoment install correct
app = Flask(__name__)
#need encryption key to be able to work. Security
app.config['SECRET_KEY'] = '1234'

#mysql=  MYSQL(app)

#route the app to the home directory
@app.route('/',methods =('GET','POST'))

#This is the index function where the main page lives 
def index():

    #return the template and html
        return redirect('/login')
    
@app.route('/registor',methods =('GET','POST'))

def register():
    print(request.method)
    # This waits till it receive a POST request from the HTML to run code 
    if request.method == 'POST':

        #Grabs variables from the html page and set them as var
        name = request.form['name'] 
        username = request.form['Username']
        email = request.form['email']
        password = request.form['password']
        if not name or not username or not password or not email:
            flash('Please fill out all info!')
        else:
            #sets conn to get into the database
            conn = get_db_connection()
            #create a courses variable to be use for homepage
            conn.execute('INSERT INTO Users (username,password,name,email) VALUES (?, ?, ?, ?)',
                         (username,password,name,email))
            
            #commit connection to the db
            conn.commit()
            #close Db 
            conn.close()
            
            return render_template('amyRegistor.html')
    else:  
      return render_template('amyRegistor.html')

@app.route('/login',methods =('GET','POST'))

def loggingtion():
    if request.method == 'POST':
        
        #assign variable name to the form info
        email = request.form['email']
        password = request.form['password']
        # check if the user has put in information 
        if not email or not password:
            flash('Fill out the form bruh')
        else: 
            conn = get_db_connection()
   
            cursor = conn.cursor()
            cursor.execute('SELECT * FROM Users WHERE email = (?)', (email,))
        
            account = cursor.fetchone()
            loginVerifed = ""

            #check if account is found then run following 
            if account:
                #set information from 
                username_from_db = account['username']
                password_from_db = account['password']
                is_admin = account['Admin']
                if password == password_from_db:
                    #Stores the information into Session
                    session['MainAccount'] = username_from_db 


                    #Admin Testing
                    if is_admin:
                        return redirect("/admin")
                    
                    ##
                    return redirect("/home")
                else: 
                    loginVerifed = "Incorrect Password"
                return render_template('amyHome.html',account = account,loginVerifed = loginVerifed)

             #commit connection to the db
            conn.commit()
            #close Db 
            conn.close()
          

            return render_template('amyHome.html',account = account)

    return render_template('amyHome.html')


@app.route('/home', methods = ('GET','POST'))


def homeRender():
     #check if session exist
     if "MainAccount" in session:
         #Get Session information from Session Data
         MainAccount = session['MainAccount']
         resultSearch = None
         commentsLog = None
         ratingTotal = None
         #pass mainaccount to html
        #search box

        #if a get request it will run this code 
         if request.method == 'GET':
            #this grabs the information 
                search = request.args.get('search')
            
            #Run queries to get result
                conn = get_db_connection()
                cursor = conn.cursor()
                cursor.execute('SELECT * FROM Course WHERE name = (?)', (search,))
                resultSearch = cursor.fetchone()
            
            #If result search exist it will run this        
                if resultSearch:
                    session['resultSearch'] = resultSearch['name']    

                    cursor = conn.cursor()
                    cursor.execute('Select * From Comment')
                    commentsLog = cursor.fetchall()


                
                    cursor = conn.cursor()
                    cursor.execute('Select AVG(ratingValue) as total From Comment WHERE courseID = (?) GROUP BY courseID', (resultSearch['id'],))
                    ratingTotal = cursor.fetchone()
                    
                    if ratingTotal:
                        ratingTotal = ratingTotal['total'] % 6
                    
                    

                    print(f'This is rating Total {ratingTotal}')


                    conn.close()


                    return render_template("amyResults.html",resultSearch = resultSearch,commentsLog = commentsLog,ratingTotal = ratingTotal)
                
            #if the search result exist and it is not in the database run this 
                elif search  and not resultSearch:
            
                    return render_template("amyResults.html",resultSearch = resultSearch)

                else:
                    return render_template('amySearch.html',resultSearch=resultSearch)
         
         if request.method == 'POST':
                #This works to put the comments into database
                if 'commentForm' in request.form:

                    #grab the comment and go through the comment for key words 
                    totalRating = 0
                    print("-----------------------------------------------------------------")
                    #Find these are the keywords and it is what it is 
                    ratingScale = {"Horrible":-3,"horrible":-3,"Bad":-2,"Alright":1,"Good":3,"Excellent":5,"bad":-2,"alright":1,"good":3,"excellent":5, "Great":4,"great":4}
                    keyWord = request.form['commentForm'].split()

                    print(keyWord)
                   
                    
            
                    for words in keyWord:

                      
                        if ratingScale.get(words) is not None:
                           
                            totalRating += ratingScale.get(words)
    
                            print(f'{words} has the assoicated value: {ratingScale.get(words)}')

                    if ratingTotal:
                        ratingTotal = ratingTotal['total'] 

                   

                    #Using Sum() to calculate all the different values 
                    #And return that value as Rating System 

                    print("--------------------------------------------------")

                    comment_Content= request.form['commentForm']
                    search_query = request.args.get('search')
                    job_title = search_query.title()

                
                    conn = get_db_connection()
                    cursor = conn.cursor()
                    cursor.execute('SELECT * FROM Course WHERE name = (?)', (job_title,))
                    resultSearch = cursor.fetchone()
                


                    conn.execute('Insert Into Comment(commentTxt,userName,courseID,ratingValue) VALUES (?, ?, ?, ?)',(comment_Content,MainAccount,resultSearch['id'],totalRating))
                    conn.commit()
                    
                    cursor = conn.cursor()
                    cursor.execute('Select * From Comment')
                    commentsLog = cursor.fetchall()

                    
                
                    cursor = conn.cursor()
                    cursor.execute('Select AVG(ratingValue) as total From Comment WHERE courseID = (?)', (resultSearch['id'],))
                    ratingTotal = cursor.fetchone()
                    

                    ratingTotal = ratingTotal['total'] 
                    
                    

                    print(f'This is rating Total {ratingTotal}')



                    conn.close()
                   
     return render_template("amyResults.html",resultSearch=resultSearch,commentsLog = commentsLog, ratingTotal = ratingTotal)         


@app.route('/admin', methods = ('GET','POST'))
def adminPage():


    return render_template('admin_page.html')


@app.route("/AdminHome")
def admin_page():
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute('SELECT * FROM requested_courses')
        
        request_course = cursor.fetchall()
    
        return render_template("AdminHome.html", values=request_course)




@app.route('/result',methods = ('GET','POST'))   
def resultPage():

    
    return render_template('amyResults.html')
@app.route('/request_course',methods =('GET','POST'))

def request_course():
    print("start")
    if request.method == 'POST':
        print("GOT")
        course_name = request.form['course_name'] 
        instructor = request.form['instructor']
        department = request.form['department']
        contact_email = request.form['contact_email']
        if not course_name or not instructor or not department or not contact_email:
            flash('Please fill out all info!')
        else:
            #sets conn to get into the database
            conn = get_db_connection()
            #create a courses variable to be use for homepage
            conn.execute('INSERT INTO requested_courses (course_name,instructor,department,contact_email) VALUES (?, ?, ?, ?)',
                         (course_name,instructor,department,contact_email))
            
            #commit connection to the db
            conn.commit()
            #close Db 
            conn.close()
            return render_template('request_course.html')
    else:
        return render_template('request_course.html')

@app.route('/about', methods = ('GET','POST'))

def profileRender():
    MainAccount = session['MainAccount']
    conn = get_db_connection()
   
    cursor = conn.cursor()
    cursor.execute('Select * From [Course Taken] Where username = (?)', (MainAccount,))
    courseRecords = cursor.fetchall()


    return render_template('amyAccount.html', MainAccount = MainAccount,courseRecords =courseRecords)
@app.route('/logout')

def loggedOut():
    MainAccount = session['MainAccount']
    session.pop(MainAccount,None)
    return redirect('/login')