import os

class processData:
    def __init__(self, path):
        self.path = ".\\ESP-data\\"+ path

        self.file_names = os.listdir(self.path)
        self.file_results = []
    
    def get_data(self):
        for path in self.file_names:
            file_data = self.file_import(path)
            file_process = self.process_data(file_data)
            file_results = [path, file_process]
            self.file_results.append(file_results)
        return self.file_results
    
    def file_import(self, path):
        path = self.path + "\\" + path
        with open(path) as file_content:
            file_temp = file_content.readline().strip("\n").split("],")
        
        file_data = []
        for line in file_temp:
            if line != '':
                file_data.append(line.strip("[").split(","))

        for i in range(len(file_data)):
            file_data[i][1] = int(file_data[i][1])
            file_data[i][2] = int(file_data[i][2])
            if file_data[i][3] == 'true':
                file_data[i][3] = True
            else:
                file_data[i][3] = False
            if file_data[i][4] == 'true':
                file_data[i][4] = True
            else:
                file_data[i][4] = False
            file_data[i][5] = int(file_data[i][5])
            file_data[i][6] = int(file_data[i][6])
        
        return file_data
    
    def process_data(self, file_data):
        file_results = []
        modes = self.get_modes(file_data)
        for mode in modes:
            genuine = 0
            phishing = 0
            time_genuine = 0
            time_phishing = 0
            correct_genuine = 0
            correct_phishing = 0
            features = 0
            correct_features = 0
            for data in file_data:
                if data[0] == mode:
                    if data[4]:
                        phishing += 1
                        time_phishing += data[2]
                        if data[3]:
                            correct_phishing += 1
                        features += data[6]
                        correct_features += data[5]
                    else:
                        genuine += 1
                        time_genuine += data[2]
                        if not data[3]:
                            correct_genuine += 1
            result = [mode, correct_genuine, genuine, time_genuine, correct_phishing, phishing, time_phishing, correct_features, features]
            file_results.append(result)
        return file_results
    
    def get_modes(self, file_data):
        modes = []
        for data in file_data:
            if data[0] not in modes:
                modes.append(data[0])
        return modes

def main():
    node = processData("data")
    print(node.get_data())

if __name__== "__main__":
    main()