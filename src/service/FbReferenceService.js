import Papa from 'papaparse';

class FbReferenceService {

  async startUpload(fileConfig, filesUpload) {
    // Get config file info
    const configInfo = await this.getConfigInfo(fileConfig);

    if (!configInfo) {
      return { error: 'Read Config File Fail!!!' };
    }

    // validate video files
    return {};
  }

  getConfigInfo(fileConfig) {
    return new Promise(resolve => {
      Papa.parse(fileConfig, {
        complete: function(results) {
          console.log(results);
          resolve(results);
        },
        error: function() {
          resolve(undefined);
        },
      });
    });
  }
}

export default new FbReferenceService();
